package com.example.trustex.service;

import com.example.trustex.dto.TransferRequestDto;
import com.example.trustex.dto.TransferResponseDto;

public interface TransferService {
    TransferResponseDto transferFunds(TransferRequestDto transferRequestDTO);
}
