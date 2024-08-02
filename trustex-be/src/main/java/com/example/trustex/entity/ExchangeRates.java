package com.example.trustex.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name="exchange_rate")
@Getter
@Setter
public class ExchangeRates {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long exchangeId;

    @ManyToOne
    @JoinColumn(name = "currencyCode")
    @JsonProperty("conversion_rates")
    private Currency currency;

    private Double rate;

    @Column(nullable = false)
    LocalDateTime timeStamp;
}
