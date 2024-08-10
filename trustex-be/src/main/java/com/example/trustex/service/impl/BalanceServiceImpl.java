package com.example.trustex.service.impl;

import com.example.trustex.dao.AssetsRepository;
import com.example.trustex.dao.CurrencyRepository;
import com.example.trustex.dto.AddMoneyRequestDto;
import com.example.trustex.dto.WithdrawMoneyRequestDto;
import com.example.trustex.entity.Assets;
import com.example.trustex.entity.Currency;
import com.example.trustex.entity.CurrencyCode;
import com.example.trustex.entity.User;
import com.example.trustex.exception.*;
import com.example.trustex.service.BalanceService;
import com.example.trustex.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BalanceServiceImpl implements BalanceService {

    private final UserService userService;
    private final CurrencyRepository currencyRepository;
    private final AssetsRepository assetsRepository;


    @Override
    @Transactional
    public void addMoneyToAsset(Long userId, AddMoneyRequestDto request) {
        User user = userService.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Kullanıcı bulunamadı"));

        validateCurrencyCode(request.getCurrencyCode());

        Currency currency = currencyRepository.findByCurrencyCode(request.getCurrencyCode().name())
                .orElseThrow(() -> new CurrencyNotFoundException("Döviz bulunamadı"));

        if (request.getAmount() <= 0) {
            throw new AmountLowerOrEqualZeroException("Miktar sıfır veya sıfırdan küçük olamaz.");
        }

        user.getAssets().stream()
                .filter(assets -> assets.getCurrency().getCurrencyCode().equals(request.getCurrencyCode().name()))
                .findFirst()
                .ifPresentOrElse(
                        assets -> assets.setAmount(assets.getAmount() + request.getAmount()),
                        () -> {
                            Assets newAsset = Assets.builder()
                                    .currency(currency)
                                    .assetName(currency.getCurrencyCode() + "Wallet")
                                    .amount(request.getAmount())
                                    .avgCost(0.0)
                                    .user(user)
                                    .build();
                            assetsRepository.save(newAsset);
                        }
                );
    }

    @Override
    @Transactional
    public void withdrawMoneyFromAsset(Long userId, WithdrawMoneyRequestDto request) {
        User user = userService.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Kullanıcı bulunamadı"));

        validateCurrencyCode(request.getCurrencyCode());

        Currency currency = currencyRepository.findByCurrencyCode(request.getCurrencyCode().name())
                .orElseThrow(() -> new IllegalArgumentException("Döviz bulunamadı"));

        Assets asset = user.getAssets().stream()
                .filter(a -> a.getCurrency().getCurrencyCode().equals(request.getCurrencyCode().name()))
                .findFirst()
                .orElseThrow(() -> new AssetNotFoundException(request.getCurrencyCode().name() + " bakiyesi bulunamadı."));

        if (asset.getAmount() < request.getAmount()) {
            throw new BalanceNotEnoughException(asset.getUser().getId());
        }

        if (request.getAmount() <= 0) {
            throw new AmountLowerOrEqualZeroException("Miktar sıfır veya sıfırdan küçük olamaz.");
        } else {
            asset.setAmount(asset.getAmount() - request.getAmount());
            assetsRepository.save(asset);
        }
    }

    private void validateCurrencyCode(CurrencyCode currencyCode) {
        boolean isValid = false;
        for (CurrencyCode code : CurrencyCode.values()) {
            if (code == currencyCode) {
                isValid = true;
                break;
            }
        }
        if (!isValid){
            throw new IllegalArgumentException("Geçersiz döviz türü: " + currencyCode);
        }
    }
}
