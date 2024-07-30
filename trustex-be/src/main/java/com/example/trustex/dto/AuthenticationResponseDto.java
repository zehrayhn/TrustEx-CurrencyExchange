package com.example.trustex.dto;


public class AuthenticationResponseDto {
    private String token;

    private long userId;

    public AuthenticationResponseDto(String token, long userId) {
        this.token = token;
        this.userId = userId;
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
}
