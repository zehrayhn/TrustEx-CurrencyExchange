package com.example.trustex.config;

import com.example.trustex.security.JwtAccessDeniedHandler;
import com.example.trustex.security.JwtAuthenticationEntryPoint;
import com.example.trustex.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final AuthenticationProvider authenticationProvider;

    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private static final Logger logger = LogManager.getLogger(SecurityConfig.class);



    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        logger.info("Configuring SecurityFilterChain");
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors((AbstractHttpConfigurer::disable))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/auth/register", "/auth/login", "/","/auth/verify","/auth/verify-code","/auth/send-verification-code",
                                "/auth/verify-and-authenticate","/auth/forgot-password","/auth/verify?token=", "/auth/reset-password/**","/auth/reset-password").permitAll()
                        .requestMatchers("/profile").authenticated()
                        .requestMatchers(HttpMethod.POST,"/trustex/supports").hasAuthority("ROLE_USER")
                        .requestMatchers(HttpMethod.GET,"/trustex/support").hasAuthority("ROLE_USER")

                        .anyRequest().authenticated()

                )

                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)

                .exceptionHandling(exceptionHandling -> {
                    exceptionHandling.accessDeniedHandler(jwtAccessDeniedHandler);
                    exceptionHandling.authenticationEntryPoint(jwtAuthenticationEntryPoint);
                })

                .logout(l -> l.logoutUrl("/log"));

        return http.build();
    }


}
