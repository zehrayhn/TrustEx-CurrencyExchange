package com.example.trustex.dto;


public class AuthenticationResponseDto {
    private String token;

    private long userId;

    private String message;

    public AuthenticationResponseDto(String token, String message) {
        this.token = token;
        this.message=message;
    }

    public AuthenticationResponseDto(String token, long userId, String message) {
        this.token = token;
        this.userId = userId;
        this.message = message;
    }

    public AuthenticationResponseDto(String token) {
        this.token = token;
    }

    public AuthenticationResponseDto() {
    }


    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
