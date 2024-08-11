package com.example.trustex.service.impl;

import com.example.trustex.dao.CurrencyRepository;
import com.example.trustex.entity.Currency;
import com.example.trustex.service.CurrencyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CurrencyServiceImpl implements CurrencyService {

    private final CurrencyRepository currencyRepository;
    public List<Currency> getAllCurrencies() {
        return currencyRepository.findAll();
    }
    @Override
    public Optional<Currency> findById(String currencyCode) {
        return currencyRepository.findById(currencyCode);
    }
}