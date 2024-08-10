package com.example.trustex.service.impl;

import com.example.trustex.dao.UserRepository;
import com.example.trustex.entity.User;
import com.example.trustex.entity.UserType;
import com.example.trustex.exception.BusinessException;
import com.example.trustex.exception.UserNotFoundException;
import com.example.trustex.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && authentication.getPrincipal() instanceof UserDetails) {
            String usernameWithType = ((UserDetails) authentication.getPrincipal()).getUsername();

            // Kullanıcı adını ayırarak idNumber ve userType'ı alıyoruz
            String[] parts = usernameWithType.split("_");
            if (parts.length < 2) {
                throw new IllegalStateException("Geçersiz kullanıcı adı formatı: " + usernameWithType);
            }
            String idNumber = parts[0];
            UserType userType = UserType.valueOf(parts[1]);

            List<User> users = getUsersByIdNumberAndType(idNumber, userType);
            if (users != null && !users.isEmpty()) {
                return users.get(0);
            }
            throw new RuntimeException("Geçerli kullanıcı bulunamadı.");
        }
        throw new RuntimeException("Geçerli kullanıcı bulunamadı.");
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() ->
                new BusinessException(HttpStatus.BAD_REQUEST , Collections.singletonList("Kullanıcı bulunamadı")));
    }




    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() ->
                new UserNotFoundException("Kullanıcı bulunamadı " ));
    }



    public List<User> getUsersByIdNumberAndType(String idNumber, UserType userType) {
        return userRepository.findByIdNumberAndUserType(idNumber, userType);
    }

    @Override
    public Optional<User> findById(Long userId) {
        return userRepository.findById(userId);
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }


}
