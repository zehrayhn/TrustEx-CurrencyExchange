package com.example.trustex.service.impl;

import com.example.trustex.dao.UserRepository;
import com.example.trustex.dto.AuthenticateRequestDto;
import com.example.trustex.dto.AuthenticationResponseDto;
import com.example.trustex.dto.RegisterRequestDto;
import com.example.trustex.entity.Role;
import com.example.trustex.entity.User;
import com.example.trustex.exception.UserAlreadyExistsException;
import com.example.trustex.security.JwtService;
import com.example.trustex.service.AuthenticationService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;
@Service

public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;


    public AuthenticationServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }



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

            userRepository.save(user);
            String jwtToken = jwtService.generateToken(user);
            return new AuthenticationResponseDto(jwtToken);
        

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
            String jwtToken = jwtService.generateToken(user);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            return new AuthenticationResponseDto(jwtToken);
        }catch (AuthenticationException e) {
            throw new RuntimeException("Doğrulama hatası: " + e.getMessage());
        }

    }
}