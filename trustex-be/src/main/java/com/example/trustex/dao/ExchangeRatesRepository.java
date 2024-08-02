package com.example.trustex.dao;

import com.example.trustex.entity.ExchangeRates;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExchangeRatesRepository extends JpaRepository<ExchangeRates, Long> {

    @Query(value = "WITH LatestTimeStamp AS (" +
            "    SELECT MAX(time_last_update_utc) AS maxTimeStamp " +
            "    FROM exchange_rate" +
            "), " +
            "TopRows AS (" +
            "    SELECT TOP 162 * " +
            "    FROM exchange_rate " +
            "    WHERE time_last_update_utc = (SELECT maxTimeStamp FROM LatestTimeStamp) " +
            "    ORDER BY time_last_update_utc DESC" +
            ") " +
            "SELECT * FROM TopRows", nativeQuery = true)
    List<ExchangeRates> findByOrderLastDesc();

}
