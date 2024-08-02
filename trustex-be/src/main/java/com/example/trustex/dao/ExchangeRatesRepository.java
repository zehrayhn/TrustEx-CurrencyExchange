package com.example.trustex.dao;

import com.example.trustex.entity.ExchangeRates;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExchangeRatesRepository extends JpaRepository<ExchangeRates, Long> {
}
