package com.example.trustex.dto;

import com.example.trustex.entity.UserType;
import lombok.Data;

@Data
public class PersonnelDto {

    private long personelId;
    private UserType userType;
}
