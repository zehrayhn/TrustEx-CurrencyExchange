package com.example.trustex.validator;

import com.example.trustex.dto.AuthenticateRequestDto;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class LoginValidator implements Validator {


    @Override
    public boolean supports(Class<?> clazz) {
        return false;
    }

    @Override
    public void validate(Object target, Errors errors) {
        AuthenticateRequestDto authenticateRequest=(AuthenticateRequestDto) target;


        boolean hasErrors = false;

        if (authenticateRequest.getEmail() == null || authenticateRequest.getEmail().trim().isEmpty()) {
            hasErrors = true;
        } else if (!authenticateRequest.getEmail().matches("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}")) {
            errors.rejectValue("email", "error.e_mail.email", "E-posta formatında olmalıdır.");
        }

        if (authenticateRequest.getPassword() == null || authenticateRequest.getPassword().trim().isEmpty()) {
            hasErrors = true;
        }

        if (hasErrors) {
            errors.reject("error.all.fields.required", "Tüm alanlar doldurulmalıdır.");
        }

    }

    @Override
    public Errors validateObject(Object target) {
        return Validator.super.validateObject(target);
    }
}