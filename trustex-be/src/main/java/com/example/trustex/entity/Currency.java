package com.example.trustex.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name="currency")
@Getter
@Setter
public class Currency {

    @Id
    private String currencyCode;
    private String currencyLabelEN;
    private String currencyLabelTR;
    @OneToMany(mappedBy = "currency")
    private List<ExchangeRates> exchangeRates;

    @OneToMany(mappedBy = "currency", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Assets> assets;

}
