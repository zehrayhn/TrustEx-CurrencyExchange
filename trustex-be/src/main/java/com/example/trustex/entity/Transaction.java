package com.example.trustex.entity;

import jakarta.persistence.*;
import lombok.Getter;

import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
@Getter
@Setter
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne
    @JoinColumn(name = "currency_code")
    private Currency currencyCode;

    @Enumerated(EnumType.STRING)
    private TransactionType transactionType;

    @Column(nullable = false)
    private double amount;

    @Column(nullable = false)
    private double currencyRate;

    private Double commissionRate;

    private double total;

    @Column(nullable = false)
    private LocalDateTime transactionDate;


}
