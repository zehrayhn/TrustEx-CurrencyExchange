package com.example.trustex.controller;

import com.example.trustex.dto.AuthenticateRequestDto;
import com.example.trustex.dto.AuthenticationResponseDto;
import com.example.trustex.dto.RegisterRequestDto;
import com.example.trustex.entity.User;
import com.example.trustex.service.AuthenticationService;
import com.example.trustex.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final UserService userService;

    public AuthenticationController(AuthenticationService authenticationService, UserService userService) {
        this.authenticationService = authenticationService;
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponseDto> register(@RequestBody RegisterRequestDto request){

        return ResponseEntity.ok(authenticationService.register(request));
    }
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponseDto> login(@RequestBody AuthenticateRequestDto request){
        AuthenticationResponseDto authenticationResponse=authenticationService.authenticate(request);
        User user=userService.getCurrentUser();
        authenticationResponse.setUserId(user.getId());
        authenticationResponse.setToken("Bearer "+ authenticationResponse.getToken());
        return ResponseEntity.ok(authenticationResponse);
    }


}
