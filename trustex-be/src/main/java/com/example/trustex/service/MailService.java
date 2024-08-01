package com.example.trustex.service;

import org.springframework.stereotype.Service;


public interface MailService {
    void sendVerificationEmail(String to, String verificationLink);


    void sendEmail(String to, String subject, String text);

}
