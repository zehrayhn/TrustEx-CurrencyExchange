package com.example.trustex.service.impl;

import com.example.trustex.dao.*;
import com.example.trustex.dto.TransactionRequestDto;
import com.example.trustex.dto.TransactionResponseDto;
import com.example.trustex.dto.converter.TransactionMapperHelper;
import com.example.trustex.entity.*;
import com.example.trustex.exception.AmountLowerOrEqualZeroException;
import com.example.trustex.exception.BalanceNotEnoughException;
import com.example.trustex.exception.ExchangeRateNotFoundException;
import com.example.trustex.exception.UserNotFoundException;
import com.example.trustex.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final ExchangeRatesRepository exchangeRatesRepository;
    private final CurrencyRepository currencyRepository;
    private final AssetsRepository assetsRepository;

    public TransactionResponseDto saveTransaction(TransactionRequestDto transactionRequest) {

        if(transactionRequest.getAmount() <= 0 )
            throw new AmountLowerOrEqualZeroException("Amount must be greater than 0");

        User user = userRepository.findById(transactionRequest.getUserId())
                .orElseThrow(() -> new UserNotFoundException(transactionRequest.getUserId().toString()));//DEĞİŞTİR

        Assets baseAsset = user.getAssets().stream()
                .filter(asset -> transactionRequest.getBaseCurrencyCode().equals(asset.getCurrency().getCurrencyCode()))
                .findFirst()
                .orElseGet(() -> createAssetForUser(user, transactionRequest.getTargetCurrencyCode()));

        Assets targetAsset = user.getAssets().stream()
                .filter(asset -> transactionRequest.getTargetCurrencyCode().equals(asset.getCurrency().getCurrencyCode()))
                .findFirst()
                .orElseGet(() -> createAssetForUser(user, transactionRequest.getTargetCurrencyCode()));

        ExchangeRates baseExchangeRates = exchangeRatesRepository.findNewestExchangeRateByCurrencyCode(transactionRequest.getBaseCurrencyCode())
                .orElseThrow(() -> new ExchangeRateNotFoundException("Exchange rate not found for currency: " + transactionRequest.getBaseCurrencyCode()));

        ExchangeRates targetExchangeRates = exchangeRatesRepository.findNewestExchangeRateByCurrencyCode(transactionRequest.getTargetCurrencyCode())
                .orElseThrow(() -> new ExchangeRateNotFoundException("Exchange rate not found for currency: " + transactionRequest.getTargetCurrencyCode()));

        Transaction transaction = handleTransaction(transactionRequest, user, baseAsset, targetAsset, baseExchangeRates , targetExchangeRates);

        return TransactionMapperHelper.transactionToTransactionResponseDto(transactionRepository.save(transaction));
    }

    public List<TransactionResponseDto> getAllTransactions() {
        List<Transaction> transactions = transactionRepository.findAll();
        return transactions.stream()
                .map(TransactionMapperHelper::transactionToTransactionResponseDto)
                .toList();
    }

    public List<TransactionResponseDto> getTransactionsByUserId(Long userId) {
        List<Transaction> transactions = transactionRepository.findByUserId(userId);
        return transactions.stream()
                .map(TransactionMapperHelper::transactionToTransactionResponseDto)
                .toList();
    }

    public String deleteTransaction(Long transactionId) {
        transactionRepository.deleteById(transactionId);
        return "Transaction Deleted Succesfully";
    }

    public TransactionResponseDto updateTransaction(Transaction transaction) {
        return TransactionMapperHelper.transactionToTransactionResponseDto(transactionRepository.save(transaction));
    }


    //PRIVATE METHODS
    private Assets createAssetForUser(User user, String currencyCode) {
        //If no asset is found in demanded currency , create one for the user.
        Assets newTransactionAsset = Assets.builder()
                .assetName(currencyCode + "Wallet")
                .amount(0.0)
                .avgCost(0.0)
                .currency(currencyRepository.findById(currencyCode).orElseThrow(() -> new IllegalArgumentException(currencyCode + " currency not found")))
                .user(user)
                .build();
        assetsRepository.save(newTransactionAsset);
        return newTransactionAsset;
    }

    private Transaction handleTransaction(TransactionRequestDto transactionRequest, User user, Assets baseAsset, Assets targetAsset, ExchangeRates baseExchangeRates , ExchangeRates targetExchangeRates) {

        boolean isBuyTransaction = transactionRequest.getTransactionType().toString().equals("BUY");
        double baseRate =  1/(isBuyTransaction ? baseExchangeRates.getBuyRate() : baseExchangeRates.getSellRate());
        double targetRate =  1/(isBuyTransaction ? targetExchangeRates.getSellRate() : targetExchangeRates.getBuyRate());
        double exchangeRate = baseRate/targetRate;

        double transactionAmount = transactionRequest.getAmount();
        double cost = transactionAmount * exchangeRate;
        double commission = cost * 0.01;
        double foreignExchangeTax = cost * 0.002;

        if (isBuyTransaction) {
            double totalCost = cost - (foreignExchangeTax + commission) ;
            if (baseAsset.getAmount() < transactionAmount){
                throw new BalanceNotEnoughException(transactionRequest.getUserId());
            } else {
                baseAsset.setAmount(baseAsset.getAmount() - transactionAmount);
                targetAsset.setAvgCost(calculateNewAvgCost(targetAsset.getAmount(), targetAsset.getAvgCost(), transactionAmount, targetRate));
                targetAsset.setAmount(targetAsset.getAmount() + totalCost);
            }
        }
        else
        {
            double totalGain = cost - commission;
            if (targetAsset.getAmount() >= transactionAmount) {
                baseAsset.setAmount(baseAsset.getAmount() + totalGain);
                targetAsset.setAmount(targetAsset.getAmount() - transactionAmount);
            } else {
                throw new BalanceNotEnoughException(transactionRequest.getUserId());
            }
        }
        Transaction transaction = createTransaction(transactionRequest, user,baseAsset.getCurrency() , targetAsset.getCurrency(), exchangeRate ,commission, foreignExchangeTax);
        assetsRepository.save(baseAsset);//DIKKAT DIKKAT Asset servisine update olarak baglanacak .
        assetsRepository.save(targetAsset);//DIKKAT DIKKAT Asset servisine update olarak baglanacak .
        return transaction;
    }

    private double calculateNewAvgCost(double oldAmount, double oldAvgCost, double newAmount, double newCost) {
        return ((oldAmount * oldAvgCost) + (newAmount * newCost)) / (oldAmount + newAmount);
    }

    private Transaction createTransaction(TransactionRequestDto transactionRequest, User user, Currency baseCurrency,Currency targetCurrency, double exchangeRate,Double commission,Double foreignExchangeTax) {
        return Transaction.builder()
                .amount(transactionRequest.getAmount())
                .transactionDate(LocalDateTime.now())
                .transactionType(transactionRequest.getTransactionType())
                .user(user)
                .currencyRate(exchangeRate)
                .commissionAmount(commission)
                .foreignExchangeTax(foreignExchangeTax)
                .baseCurrency(baseCurrency)
                .targetCurrency(targetCurrency)
                .total((transactionRequest.getAmount() * exchangeRate) -(commission + foreignExchangeTax))
                .build();
    }

}
