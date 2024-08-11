package com.example.trustex.controller;

import com.example.trustex.dto.AssetResponseDto;
import com.example.trustex.entity.Assets;
import com.example.trustex.entity.User;
import com.example.trustex.service.AssetsService;
import com.example.trustex.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/assets")
@RequiredArgsConstructor
public class AssetsController {

    private final AssetsService assetsService;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<Assets>> getAllAssets() {
        List<Assets> assets = assetsService.getAllAssets();
        return ResponseEntity.ok(assets);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Assets>> getAssetsByUser(Principal principal) {
        User user = getCurrentUser(principal);
        List<Assets> assets = assetsService.getAssetsByUser(user);
        return ResponseEntity.ok(assets);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Assets>> getAssetsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(assetsService.getAssetsByUserId(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Assets> getAssetById(@PathVariable Long id) {
        Assets asset = assetsService.getAssetById(id);
        return ResponseEntity.ok(asset);
    }
    @GetMapping("/user/{userId}/{currencyCode}")
    public ResponseEntity<AssetResponseDto> getAssetByUserAndCurrencyCode (@PathVariable Long userId, @PathVariable String currencyCode) {

        return ResponseEntity.ok(assetsService.getAssetByUserIdAndCurrencyCode(userId, currencyCode));
    }
    @PostMapping
    public ResponseEntity<Assets> createAsset(@RequestBody Assets asset) {
        Assets savedAsset = assetsService.saveAsset(asset);
        return ResponseEntity.ok(savedAsset);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Assets> updateAsset(@PathVariable Long id, @RequestBody Assets asset) {
        asset.setId(id);
        assetsService.updateAsset(asset);
        return ResponseEntity.ok(asset);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAsset(@PathVariable Long id) {
        assetsService.deleteAsset(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update-amount")
    public ResponseEntity<Void> updateAssetAmount(@RequestParam String currencyCode, @RequestParam double amount, Principal principal) {
        User user = getCurrentUser(principal);
        assetsService.updateAssetAmount(user, currencyCode, amount);
        return ResponseEntity.ok().build();
    }

    private User getCurrentUser(Principal principal) {
        return userService.getCurrentUser();
    }

}
