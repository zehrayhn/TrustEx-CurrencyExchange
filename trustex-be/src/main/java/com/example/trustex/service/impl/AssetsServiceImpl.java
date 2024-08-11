package com.example.trustex.service.impl;

import com.example.trustex.dao.AssetsRepository;
import com.example.trustex.dao.CurrencyRepository;
import com.example.trustex.dto.AssetResponseDto;
import com.example.trustex.entity.Assets;
import com.example.trustex.entity.Currency;
import com.example.trustex.entity.User;
import com.example.trustex.exception.AssetNotFoundException;
import com.example.trustex.exception.CurrencyNotFoundException;
import com.example.trustex.service.AssetsService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AssetsServiceImpl implements AssetsService {

    private final AssetsRepository assetsRepository;
    private final CurrencyRepository currencyRepository;

    @Override
    public List<Assets> getAllAssets() {
        return assetsRepository.findAll();
    }

    @Override
    public List<Assets> getAssetsByUser(User user) {
        return assetsRepository.findByUser(user);
    }

    @Override
    public List<Assets> getAssetsByUserId(Long userId) {
        return assetsRepository.findByUserId(userId);
    }

    @Override
    public Assets getAssetById(Long id) {
        return assetsRepository.findById(id)
                .orElseThrow(() -> new AssetNotFoundException("Bu ID ile varlık bulunamadı: " + id));
    }

    @Override
    public Assets getAssetByUserAndCurrencyCode(User user, String currencyCode) {
        return assetsRepository.findByUserAndCurrencyCurrencyCode(user, currencyCode)
                .orElseThrow(() -> new AssetNotFoundException("Bu kullanıcı ve döviz koduna göre varlık bulunamadı: " + currencyCode));
    }

    @Override
    public AssetResponseDto getAssetByUserIdAndCurrencyCode(Long userId, String currencyCode) {
       Assets asset = assetsRepository.findByUserAndCurrencyCode(userId, currencyCode)
                .orElseThrow(() -> new AssetNotFoundException("Bu kullanıcı ve döviz koduna göre varlık bulunamadı: " + currencyCode));

        return AssetResponseDto.builder()
                .assetName(asset.getAssetName())
                .userId(asset.getUser().getId())
                .currencyCode(asset.getCurrency().getCurrencyCode())
                .amount(asset.getAmount())
                .avgCost(asset.getAvgCost())
                .build();
    }

    @Override
    public Assets saveAsset(Assets asset) {
        Currency currency = currencyRepository.findById(asset.getCurrency().getCurrencyCode())
                .orElseThrow(() -> new CurrencyNotFoundException("Döviz bulunamadı: " + asset.getCurrency().getCurrencyCode()));
        asset.setCurrency(currency);
        asset.setAssetName(asset.getCurrency().getCurrencyCode().toString()+"Walllet");
        return assetsRepository.save(asset);
    }

    @Override
    public void updateAsset(Assets asset) {
        Currency currency = currencyRepository.findById(asset.getCurrency().getCurrencyCode())
                .orElseThrow(() -> new CurrencyNotFoundException("Döviz bulunamadı: " + asset.getCurrency().getCurrencyCode()));
        asset.setCurrency(currency);
        if (!assetsRepository.existsById(asset.getId())) {
            throw new AssetNotFoundException("Bu ID ile varlık bulunamadı: " + asset.getId());
        }
        assetsRepository.save(asset);
    }

    @Override
    public void deleteAsset(Long id) {
        if (!assetsRepository.existsById(id)) {
            throw new AssetNotFoundException("Bu ID ile varlık bulunamadı: " + id);
        }
        assetsRepository.deleteById(id);
    }

    @Transactional
    @Override
    public void updateAssetAmount(User user, String currencyCode, double amount) {
        Assets asset = assetsRepository.findByUserAndCurrencyCurrencyCode(user, currencyCode)
                .orElseThrow(() -> new AssetNotFoundException("Bu kullanıcı ve döviz koduna göre varlık bulunamadı: " + currencyCode));
        asset.setAmount(asset.getAmount() + amount);
        assetsRepository.save(asset);
    }

    @Override
    public Optional<Assets> findByUserAndCurrency(User user, Currency currency) {
        return assetsRepository.findByUserAndCurrency(user, currency);
    }

/*    @Override
    public Optional<Assets> findByUserAndCurrency(User user, Currency currency) {
        return assetsRepository.findByUserAndCurrency(user, currency);
    }*/

    @Override
    public double getTotalAssetValueByUser(User user) {
        List<Assets> assets = assetsRepository.findByUser(user);
        return assets.stream()
                .mapToDouble(asset -> asset.getAmount() * asset.getAvgCost())
                .sum();
    }

    @Override
    public double getAvgCostByUserAndCurrencyCode(User user, String currencyCode) {
        Assets asset = assetsRepository.findByUserAndCurrencyCurrencyCode(user, currencyCode)
                .orElseThrow(() -> new AssetNotFoundException("Bu kullanıcı ve döviz koduna göre varlık bulunamadı: " + currencyCode));
        return asset.getAvgCost();
    }

    @Override
    public double calculateTotalAssetsValueByUser(User user) {
        List<Assets> assets = getAssetsByUser(user);
        return assets.stream()
                .mapToDouble(asset -> asset.getAmount() * asset.getAvgCost())
                .sum();
    }
}
