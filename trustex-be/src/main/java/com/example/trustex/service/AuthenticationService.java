package com.example.trustex.service;

import com.example.trustex.dto.AuthenticateRequestDto;
import com.example.trustex.dto.AuthenticationResponseDto;
import com.example.trustex.dto.RegisterRequestDto;
import com.example.trustex.entity.User;


public interface AuthenticationService {

    AuthenticationResponseDto register(RegisterRequestDto request);

    AuthenticationResponseDto authenticate(AuthenticateRequestDto request);

    void verifyUser(String token);

    User validateUser(String email, String password);
}
