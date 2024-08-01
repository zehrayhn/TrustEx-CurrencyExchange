package com.example.trustex.dto;

import lombok.Data;
import lombok.Getter;

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

//    public RegisterRequestDto() {
//    }
//
//    public RegisterRequestDto(String firstname, String lastname, String email, String password) {
//        this.firstname = firstname;
//        this.lastname = lastname;
//        this.email = email;
//        this.password = password;
//    }
//
//
//
//
//    public String getFirstname() {
//        return firstname;
//    }
//
//    public void setFirstname(String firstname) {
//        this.firstname = firstname;
//    }
//
//    public String getLastname() {
//        return lastname;
//    }
//
//    public void setLastname(String lastname) {
//        this.lastname = lastname;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }
}
