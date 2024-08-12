package com.example.trustex.service;

import com.example.trustex.dto.UserDto;
import com.example.trustex.dto.UserProfileDto;
import com.example.trustex.entity.User;
import com.example.trustex.entity.UserType;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User getCurrentUser();
    User getUserById(Long id);
    UserProfileDto getUserDtoById(Long id);
    User getUserByEmail(String email);

    List<User> getUsersByIdNumberAndType(String idNumber, UserType userType);
    Optional<User> findById(Long userId);

    UserProfileDto saveUser(User user);
}
