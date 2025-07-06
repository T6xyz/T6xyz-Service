package com.T6xyz_Service.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    private final AuthProvider authProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .addFilterBefore(new TokenFilter(authProvider), BasicAuthenticationFilter.class)
            .authorizeHttpRequests((requests) -> requests.requestMatchers(HttpMethod.POST, "/com/T6xyz-Backend-Service/LoginUser", "/com/T6xyz-Backend-Service/RegisterUser").permitAll().anyRequest().authenticated());
        
        return http.build();
    }
}
