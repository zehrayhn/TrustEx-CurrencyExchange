package com.example.trustex.controller;

import com.example.trustex.dto.CrossTransactionRequestDto;
import com.example.trustex.dto.CrossTransactionResponseDto;
import com.example.trustex.dto.TransactionRequestDto;
import com.example.trustex.dto.TransactionResponseDto;
import com.example.trustex.service.CrossTransactionService;
import com.example.trustex.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.example.trustex.util.AppConstants.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL+"/crossTransactions")
public class CrossTransactionController {

    private final CrossTransactionService crossTransactionService;

    @PostMapping("/buySell")
    public ResponseEntity<CrossTransactionResponseDto> saveTransaction(@RequestBody CrossTransactionRequestDto crossTransactionRequest) {
        return ResponseEntity.ok(crossTransactionService.saveTransaction(crossTransactionRequest));
    }


}
