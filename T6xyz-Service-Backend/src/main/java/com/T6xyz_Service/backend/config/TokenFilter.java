package com.T6xyz_Service.backend.config;

import java.io.IOException;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class TokenFilter extends OncePerRequestFilter {
    private final AuthProvider authProvider;

    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String header = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (header != null) {
            String[] authElements = header.split(" ");

            if (authElements.length == 2 && authElements[0].equals("Bearer")) {
                try {
                    SecurityContextHolder.getContext().setAuthentication(authProvider.validateJWT(authElements[1]));
                } catch (Exception e) {
                    SecurityContextHolder.clearContext();
                    throw new RuntimeException(e.getMessage());
                }
            }
        }
        filterChain.doFilter(request, response);
    }  
}
