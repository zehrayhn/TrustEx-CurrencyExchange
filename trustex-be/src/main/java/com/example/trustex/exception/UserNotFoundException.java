package com.example.trustex.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String s) {
        super("Kullanıcı bulunamadı: " + s);
    }
}
