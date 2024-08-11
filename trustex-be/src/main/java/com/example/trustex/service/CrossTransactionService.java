package com.example.trustex.service;

import com.example.trustex.dto.CrossTransactionRequestDto;
import com.example.trustex.dto.CrossTransactionResponseDto;

public interface CrossTransactionService {
    CrossTransactionResponseDto saveTransaction(CrossTransactionRequestDto crossTransactionRequest);
}
