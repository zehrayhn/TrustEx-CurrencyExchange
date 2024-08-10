package com.example.trustex.controller;

import com.example.trustex.dto.TransferRequestDto;
import com.example.trustex.dto.TransferResponseDto;
import com.example.trustex.service.TransferService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/transfers")
@RequiredArgsConstructor
public class TransferController {

    private final TransferService transferService;

    @PostMapping
    public TransferResponseDto transferFunds(@RequestBody TransferRequestDto transferRequestDTO) {
        return transferService.transferFunds(transferRequestDTO);
    }


}
