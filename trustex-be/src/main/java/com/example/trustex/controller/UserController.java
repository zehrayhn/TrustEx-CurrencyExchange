package com.example.trustex.controller;


import com.example.trustex.dto.UserDto;
import com.example.trustex.entity.User;
import com.example.trustex.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/profile")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<UserDto> getProfile() {

        User user= (User) userService.getCurrentUser();
        UserDto profile = new UserDto(user.getFirstname(), user.getLastname(), user.getEmail());
//        return ResponseEntity.ok(profile); // JSON formatında dön
        return ResponseEntity.ok(profile);
    }



}
