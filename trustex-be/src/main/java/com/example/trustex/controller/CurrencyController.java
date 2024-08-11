package com.example.trustex.controller;

import com.example.trustex.entity.Currency;
import com.example.trustex.service.CurrencyService;
import com.example.trustex.util.AppConstants;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.example.trustex.util.AppConstants.BASE_URL;

@RestController
@RequestMapping(BASE_URL +"/currencies")
@RequiredArgsConstructor
public class CurrencyController {
    private final CurrencyService currencyService;

    @GetMapping
    public List<Currency> getAllCurrencies() {
        return currencyService.getAllCurrencies();
    }

}
