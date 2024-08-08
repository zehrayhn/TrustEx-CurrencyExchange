package com.example.trustex.config;

import com.example.trustex.dao.UserRepository;
import com.example.trustex.entity.User;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class ApplicationConfig {

    private final UserService userService;

    private static final Logger logger= (Logger) LogManager.getLogger(ApplicationConfig.class);

    @Bean
    public UserDetailsService userDetailsService(){
        return usernameWithType -> {
            String[] parts = usernameWithType.split("_");
            if (parts.length < 2) {
                throw new UsernameNotFoundException("Geçersiz kullanıcı adı veya kullanıcı türü.");
            }
            String idNumber = parts[0];
            UserType userType = UserType.valueOf(parts[1]);

            if (user == null) {
                throw new UsernameNotFoundException("User not found");
            }
            List<GrantedAuthority> authoritiesList = new ArrayList<>();
      //      authoritiesList.add(new SimpleGrantedAuthority(user.getRole().toString()));
            authoritiesList.add(new SimpleGrantedAuthority("ROLE_" + user.getRole()));
            logger.info("User role: " + user.getRole());
            return new org.springframework.security.core.userdetails.User(
                    user.getEmail(),
                    user.getPassword(),
                    authoritiesList);

        };
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {

        DaoAuthenticationProvider authProvider=new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();

    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
