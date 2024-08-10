package com.example.trustex.service;

import com.example.trustex.dto.AddMoneyRequestDto;
import com.example.trustex.dto.WithdrawMoneyRequestDto;

public interface BalanceService {
    void addMoneyToAsset(Long userId, AddMoneyRequestDto request);
    void withdrawMoneyFromAsset(Long userId, WithdrawMoneyRequestDto request);
}
