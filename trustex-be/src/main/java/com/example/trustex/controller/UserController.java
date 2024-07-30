package com.example.trustex.controller;


import com.example.trustex.dto.UserDto;
import com.example.trustex.entity.User;
import com.example.trustex.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/profile")
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    @GetMapping
    public ResponseEntity<UserDto> getProfile() {

        User user=userService.getCurrentUser();
        UserDto profile = new UserDto(user.getFirstname(), user.getLastname(), user.getEmail());
//        return ResponseEntity.ok(profile); // JSON formatında dön
        return ResponseEntity.ok(profile);
    }



}
