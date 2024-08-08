package com.example.trustex.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class AuthenticationResponseDto {
    private String token;

    private long userId;

    private String message;



    public AuthenticationResponseDto(String token, long userId, String message) {
        this.token = token;
        this.userId = userId;
        this.message = message;
    }

    public AuthenticationResponseDto(String token) {
        this.token = token;
    }


}
