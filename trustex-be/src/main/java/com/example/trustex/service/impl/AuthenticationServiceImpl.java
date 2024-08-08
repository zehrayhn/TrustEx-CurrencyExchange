package com.example.trustex.service.impl;

import com.example.trustex.dao.UserRepository;
import com.example.trustex.dto.*;
import com.example.trustex.entity.Role;
import com.example.trustex.entity.User;
import com.example.trustex.entity.UserType;
import com.example.trustex.exception.*;
import com.example.trustex.security.JwtService;
import com.example.trustex.service.AuthenticationService;
import com.example.trustex.service.MailService;
import com.example.trustex.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.UUID;
@Service
@RequiredArgsConstructor

public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    private final MailService mailService;
    private final UserService userService;
    Logger logger = LoggerFactory.getLogger(AuthenticationServiceImpl.class);
    private static final int EXPIRATION_TIME_IN_HOURS = 1;
    @Override
    public AuthenticationResponseDto register(RegisterRequestDto request) {
        if (existsByEmail(request.getEmail())) {
            throw new UserAlreadyExistsException("Bu Email kullanılmaktadır.");
        }
        if (userRepository.existsByIdNumberAndUserType(request.getIdNumber(), request.getUserType())) {
            throw new UserAlreadyExistsException("Bu ID numarasına kayıtlı kullanıcı türü zaten mevcut.");
        }

        String verificationToken = UUID.randomUUID().toString();
        User user = new User();
        user.setIdNumber(request.getIdNumber());
        user.setFirstname(request.getFirstname());
        user.setEmail(request.getEmail());
        user.setLastname(request.getLastname());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setCountry(request.getCountry());
        user.setMobilePhone(request.getMobilePhone());
        user.setDateOfBirth(request.getDateOfBirth());

        if (request.getUserType() == UserType.INDIVIDUAL) {
            user.setUserType(request.getUserType());
            user.setRole(Role.USER);
            user.setVerificationToken(verificationToken);
            user.setVerified(false);
            user.setCompanyTitle(null);
            user.setCorporateCustomerNumber(null);
            userRepository.save(user);

        }
        if (request.getUserType() == UserType.CORPORATE) {

            if (request.getCorporateCustomerNumber() == null || request.getCorporateCustomerNumber().isEmpty()) {
                throw new ValidationException("Kurumsal müşteri numarası boş olamaz");
            }
            if (request.getCompanyTitle() == null || request.getCompanyTitle().isEmpty()) {
                throw new ValidationException("Şirket ünvanı boş olamaz");
            }
            user.setUserType(request.getUserType());
            user.setCorporateCustomerNumber(request.getCorporateCustomerNumber());
            user.setCompanyTitle(request.getCompanyTitle());

            user.setRole(Role.USER);
            user.setVerificationToken(verificationToken);
            user.setVerified(false);

            userRepository.save(user);

        }

        String verificationLink = "http://localhost:9090/auth/verify?token=" + verificationToken;
        mailService.sendVerificationEmail(user.getEmail(), verificationLink);


        String jwtToken = jwtService.generateToken(user);
        return new AuthenticationResponseDto(jwtToken);

    }

    private boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    private String generateVerificationCode() {
        return String.format("%06d", new Random().nextInt(1000000));
    }

    @Override
    public void verifyUser(String token) {
        User user= userRepository.findByVerificationToken(token);
        if (user == null) {
            throw new InvalidCredentialsException("Geçersiz doğrulama token'ı.");
        }
        user.setVerified(true);
        user.setVerificationToken(null);
        userRepository.save(user);
    }

    @Override
    public AuthenticationResponseDto sendVerificationCode(AuthenticateRequestDto request) {
        if (request.getUserType() == UserType.INDIVIDUAL) {
            return sendVerificationCodeIndividual(request);
        } else if (request.getUserType() == UserType.CORPORATE) {
            return sendVerificationCodeCorporate(request);
        } else {
            throw new InvalidCredentialsException("Geçersiz kullanıcı tipi.");
        }
    }

    private AuthenticationResponseDto sendVerificationCodeIndividual(AuthenticateRequestDto request) {

        UserType userType = request.getUserType();
        if ( request.getPassword() == null || request.getIdNumber().isEmpty()) {
            throw new ValidationException("Tüm alanlar doldurulmalıdır.");
        }

        List<User> users = userService.getUsersByIdNumberAndType(request.getIdNumber(),userType );

        if (users == null || users.isEmpty()) {
            throw new InvalidCredentialsException("Kullanıcı bulunamadı.");
        } else if (users.size() > 1) {
            throw new InvalidCredentialsException("Birden fazla kullanıcı bulundu.");
        }

        User user = users.get(0);


        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BusinessException(HttpStatus.BAD_REQUEST, Arrays.asList("Şifrenizi kontrol ediniz."));
        }
        if (!user.isVerified()) {
            throw new InvalidCredentialsException("Hesabınız doğrulanmamış. Lütfen e-posta adresinize gönderilen doğrulama linkine tıklayın.");
        }

        String verificationCode = generateVerificationCode();
        user.setVerificationCode(verificationCode);
        user.setVerificationCodeExpiry(LocalDateTime.now().plusMinutes(20));
        userRepository.save(user);

        mailService.sendVerificationCodeEmail(user.getEmail(), verificationCode);

        return new AuthenticationResponseDto("Doğrulama kodu e-posta adresinize iletildi.");
    }

    @Async
    protected AuthenticationResponseDto sendVerificationCodeCorporate(AuthenticateRequestDto request) {
        UserType userType = request.getUserType();
        if (request.getCorporateCustomerNumber() == null || request.getCorporateCustomerNumber().isEmpty() || request.getPassword() == null || request.getIdNumber().isEmpty()) {
            throw new ValidationException("Tüm alanlar doldurulmalıdır.");
        }
        List<User> users = userService.getUsersByIdNumberAndType(request.getIdNumber(),userType);

        if (users == null || users.isEmpty()) {
            throw new InvalidCredentialsException("Kullanıcı bulunamadı.");
        } else if (users.size() > 1) {
            throw new InvalidCredentialsException("Birden fazla kullanıcı bulundu.");
        }

        User user = users.get(0);

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BusinessException(HttpStatus.BAD_REQUEST, Arrays.asList("Şifrenizi kontrol ediniz."));
        }
        if (!user.isVerified()) {
            throw new InvalidCredentialsException("Hesabınız doğrulanmamış. Lütfen e-posta adresinize gönderilen doğrulama linkine tıklayın.");
        }

        String verificationCode = generateVerificationCode();
        user.setVerificationCode(verificationCode);
        user.setVerificationCodeExpiry(LocalDateTime.now().plusMinutes(20));
        userRepository.save(user);

        mailService.sendVerificationCodeEmail(user.getEmail(), verificationCode);

        return new AuthenticationResponseDto("Doğrulama kodu e-posta adresinize iletildi. ");
    }



    @Override
    public AuthenticationResponseDto verifyAndAuthenticate(VerifyCodeRequestDto request) {

        User user = null;
        List<User> users = userService.getUsersByIdNumberAndType(request.getIdNumber(),request.getUserType());

        if (users == null || users.isEmpty()) {
            throw new InvalidCredentialsException("Kullanıcı bulunamadı.");
        } else if (users.size() > 1) {
            throw new InvalidCredentialsException("Birden fazla kullanıcı bulundu.");
        } else {
            user = users.get(0);
        }
        if (user.getVerificationCode() == null || user.getVerificationCodeExpiry().isBefore(LocalDateTime.now())) {
            throw new InvalidCredentialsException("Kod geçersiz veya süresi dolmuş.");
        }
        if (user.getVerificationCode().equals(request.getVerificationCode())) {
            user.setVerificationCode(null);
            user.setVerificationCodeExpiry(null);
            userRepository.save(user);
            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                logger.error("Password mismatch for user: {}", user.getUsername());
                throw new InvalidCredentialsException("Şifre yanlış.");
            }

            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    request.getIdNumber()+"_"+user.getUserType(),
                    request.getPassword()

            ));

            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                throw new InvalidCredentialsException("Şifre yanlış.");
            }
            String jwtToken = jwtService.generateToken(user);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            User currentUser=userService.getCurrentUser();

            return new AuthenticationResponseDto("Bearer "+jwtToken, currentUser.getId(), "Doğrulama başarılı.");
        } else {
            throw new InvalidCredentialsException("Kod hatalı.");
        }
    }

    @Override
    public void sendResetPasswordEmail(String email) {
        User user = userService.getUserByEmail(email);

        String token = UUID.randomUUID().toString();


        user.setResetPasswordToken(token);
        user.setResetPasswordTokenExpiration(LocalDateTime.now(ZoneId.systemDefault()).plusHours(EXPIRATION_TIME_IN_HOURS));
        userRepository.save(user);

        String resetPasswordLink = "http://localhost:3000/auth/reset-password?token=" + token;


        String subject = "Şifre Sıfırlama Talebi";
        String content = "Şifrenizi sıfırlamak için aşağıdaki bağlantıya tıklayın:\n" + resetPasswordLink;

        mailService.sendEmail(email, subject, content);

    }

    @Override
    public void resetPassword(String token, ResetPasswordRequest request) {
        User user = userRepository.findByResetPasswordToken(token)
              // .filter(u -> u.getResetTokenExpiration().isAfter(LocalDateTime.now(ZoneId.systemDefault())))
                .orElseThrow(() -> new InvalidCredentialsException("Geçersiz veya süresi dolmuş token."));

        if(request.getPassword().equals(request.getConfirmPassword())) {

            user.setPassword(passwordEncoder.encode(request.getConfirmPassword()));
            user.setResetPasswordToken(null);
            userRepository.save(user);
        }else{
            throw new InvalidCredentialsException("Şifreler uyuşmuyor");
        }


    }


}