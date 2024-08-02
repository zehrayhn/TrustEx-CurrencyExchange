package com.example.trustex.service;

import com.example.trustex.dto.ExchangeRateResponseDto;

import java.util.List;

public interface ExchangeRateService {
    String getExchangeRateFromApi();
    List<ExchangeRateResponseDto> getExchangeRates();
}
