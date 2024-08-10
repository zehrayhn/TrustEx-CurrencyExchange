package com.example.trustex.controller;

import com.example.trustex.dto.AddMoneyRequestDto;
import com.example.trustex.dto.WithdrawMoneyRequestDto;
import com.example.trustex.service.BalanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class BalanceController {

    private final BalanceService balanceService;

    @PostMapping("/{userId}/add-money")
    public ResponseEntity<String> addMoneyToTRYAsset(
            @PathVariable("userId") Long userId,
            @RequestBody AddMoneyRequestDto addMoneyRequestDto) {
        balanceService.addMoneyToAsset(userId, addMoneyRequestDto);
        return ResponseEntity.ok("Para hesaba başarıyla eklendi.");
    }

    @PostMapping("/{userId}/withdraw-money")
    public ResponseEntity<String> withdrawMoneyFromTRYAsset(
            @PathVariable("userId") Long userId,
            @RequestBody WithdrawMoneyRequestDto withdrawMoneyRequestDto) {
        balanceService.withdrawMoneyFromAsset(userId, withdrawMoneyRequestDto);
        return ResponseEntity.ok("Para başarıyla çekildi.");
    }
}

