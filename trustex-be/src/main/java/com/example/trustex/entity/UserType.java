package com.example.trustex.entity;

public enum UserType {
    INDIVIDUAL(1),
    CORPORATE(2);
    private final int value;

    UserType(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
