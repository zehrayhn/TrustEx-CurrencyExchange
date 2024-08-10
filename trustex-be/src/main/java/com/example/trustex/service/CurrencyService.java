package com.example.trustex.service;

import com.example.trustex.entity.Currency;

import java.util.Optional;

public interface CurrencyService {

    Optional<Currency> findById(String currencyCode);
}
