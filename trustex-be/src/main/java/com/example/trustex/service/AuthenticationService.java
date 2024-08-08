package com.example.trustex.service;

import com.example.trustex.dto.*;
import com.example.trustex.entity.User;


public interface AuthenticationService {

    AuthenticationResponseDto register(RegisterRequestDto request);

    AuthenticationResponseDto sendVerificationCode(AuthenticateRequestDto request);

    void verifyUser(String token);


    AuthenticationResponseDto verifyAndAuthenticate(VerifyCodeRequestDto request);

    void sendResetPasswordEmail(String email);

    void resetPassword(String token, ResetPasswordRequest request);
}
