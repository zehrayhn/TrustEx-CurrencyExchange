package com.example.trustex.dao;

import com.example.trustex.entity.CrossTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CrossTransactionRepository extends JpaRepository<CrossTransaction, Long> {
}
