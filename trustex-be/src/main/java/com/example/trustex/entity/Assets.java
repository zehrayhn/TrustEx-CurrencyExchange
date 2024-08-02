package com.example.trustex.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="assets")
@Getter
@Setter
public class Assets {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String assetName;

    @ManyToOne
    private Wallet wallet;

    @ManyToOne
    private Currency currency;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private Double avgCost;
}
