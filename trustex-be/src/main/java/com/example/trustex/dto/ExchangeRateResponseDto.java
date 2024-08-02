package com.example.trustex.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter

public class ExchangeRateResponseDto {
    private String currencyCode;
    private String currencyLabelTR;
    private Double conversionRate;
    private LocalDateTime timeLastUpdateUtc;

}
