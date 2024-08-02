package com.example.trustex.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name="currency")
@Getter
@Setter
public class Currency {

    @Id
    private String currencyCode;

    private String CurrencyLabel;

    @OneToMany(mappedBy = "currency")
    private List<ExchangeRates> exchangeRates;
}
