package com.example.trustex.controller;

import com.example.trustex.dto.ExchangeRateResponseDto;
import com.example.trustex.service.ExchangeRateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/exchange-rates")
public class ExchangeRateController {

    private final ExchangeRateService exchangeRateService;


    @GetMapping("/latest")
    public String getLatestExchangeRate() {
        return exchangeRateService.getExchangeRateFromApi();
    }

    @GetMapping("/currency")
    public List<ExchangeRateResponseDto> getCurrency() {
        return exchangeRateService.getExchangeRates();
    }

    // Other endpoints can be added here
}
