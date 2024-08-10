package com.example.trustex.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransferResponseDto {
    private Long transactionId;
    private Long senderId;
    private Long receiverId;
    private String currencyCode;
    private double amount;
    private String status;
    private String message;
}