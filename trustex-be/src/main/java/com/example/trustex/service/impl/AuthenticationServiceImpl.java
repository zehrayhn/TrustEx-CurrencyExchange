package com.example.trustex.service.impl;

import com.example.trustex.dao.UserRepository;
import com.example.trustex.dto.AuthenticateRequestDto;
import com.example.trustex.dto.AuthenticationResponseDto;
import com.example.trustex.dto.RegisterRequestDto;
import com.example.trustex.entity.Role;
import com.example.trustex.entity.User;
import com.example.trustex.entity.UserType;
import com.example.trustex.exception.AuthenticationFailedException;
import com.example.trustex.exception.InvalidCredentialsException;
import com.example.trustex.exception.UserAlreadyExistsException;
import com.example.trustex.security.JwtService;
import com.example.trustex.service.AuthenticationService;
import com.example.trustex.service.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;
@Service
@RequiredArgsConstructor

public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    private final MailService mailService;



    @Override
    public AuthenticationResponseDto register(RegisterRequestDto request) {
        if (existsByEmail(request)) {
            throw new UserAlreadyExistsException("Bu Email kullanılmaktadır.");
        }
            // Kullanıcı bulunamadıysa yeni kullanıcı oluştur
            String verificationToken = UUID.randomUUID().toString();

            User user = new User();
            user.setFirstname(request.getFirstname());
            user.setEmail(request.getEmail());
            user.setLastname(request.getLastname());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setRole(Role.USER);
            user.setVerificationToken(verificationToken);
            user.setVerified(false);
            user.setUserType(UserType.INDIVIDUAL);
            user.setCountry(request.getCountry());
user.setMobilePhone(request.getMobilePhone());
user.setDateOfBirth(request.getDateOfBirth());
user.setIdNumber(request.getIdNumber());
            userRepository.save(user);

            String verificationLink = "http://localhost:9090/auth/verify?token=" + verificationToken;
            mailService.sendVerificationEmail(user.getEmail(), verificationLink);

            String successMessage = "Kayıt işleminiz başarıyla tamamlandı. Hesabınızı doğrulamak için e-posta adresinize gönderilen bağlantıya tıklayın.";

            String jwtToken = jwtService.generateToken(user);
            return new AuthenticationResponseDto(jwtToken,successMessage);
        

    }

    private boolean existsByEmail(RegisterRequestDto request) {
        return userRepository.existsByEmail(request.getEmail());
    }

    @Override
    public AuthenticationResponseDto authenticate(AuthenticateRequestDto request) {

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );

            User user = userRepository.findByEmail(request.getEmail());
            if (user == null) {
                throw new RuntimeException("Kullanıcı bulunamadı");
            }

            user = validateUser(request.getEmail(), request.getPassword());
            if (!user.isVerified()) {
                throw new InvalidCredentialsException("Hesabınız doğrulanmamış. Lütfen e-posta adresinize gönderilen doğrulama linkine tıklayın.");
            }

            String jwtToken = jwtService.generateToken(user);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            return new AuthenticationResponseDto(jwtToken);
        }catch (AuthenticationException e) {
            throw new AuthenticationFailedException("Doğrulama hatası ");
        }

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
    public User validateUser(String email, String password)  {
        User user = userRepository.findByEmail(email);
        if(user==null){
            throw new RuntimeException("User not found");
        }
        boolean matches = passwordEncoder.matches(password, user.getPassword());
        if (matches) {
            return user;
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }


}