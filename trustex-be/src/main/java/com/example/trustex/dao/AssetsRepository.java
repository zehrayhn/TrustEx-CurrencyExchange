package com.example.trustex.dao;

import com.example.trustex.entity.Assets;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetsRepository extends JpaRepository<Assets, Long> {
}
