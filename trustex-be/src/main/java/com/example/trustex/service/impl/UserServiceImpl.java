package com.example.trustex.service.impl;

import com.example.trustex.dao.UserRepository;
import com.example.trustex.entity.User;
import com.example.trustex.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            if (authentication.getPrincipal() instanceof UserDetails) {
                String email = ((UserDetails) authentication.getPrincipal()).getUsername();
                return userRepository.findByEmail(email);
            } else if (authentication.getPrincipal() instanceof User) {
                return (User) authentication.getPrincipal();
            }
        }    return null;
    }


}
