package com.example.trustex.dto;

import com.example.trustex.entity.Currency;
import com.example.trustex.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Builder
@RequiredArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class AssetResponseDto {

    private String assetName;

    private Long userId;

    private String currencyCode;

    private Double amount;

    private Double avgCost;
}
