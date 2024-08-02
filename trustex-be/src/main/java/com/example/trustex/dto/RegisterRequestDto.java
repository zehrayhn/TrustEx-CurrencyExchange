package com.example.trustex.dto;

import lombok.Data;


import java.time.LocalDate;

@Data
public class RegisterRequestDto {
    private String firstname;
    private String lastname;
    private String email;
    private String password;

    private String confirmPassword;
    private String mobilePhone;

    private String idNumber;
    private String country;
    private LocalDate dateOfBirth;

}
