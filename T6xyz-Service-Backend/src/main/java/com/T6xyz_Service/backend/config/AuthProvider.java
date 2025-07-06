package com.T6xyz_Service.backend.config;

import java.util.Base64;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@AllArgsConstructor
@Component
public class AuthProvider {
@Value("${security.jwt.token.secret-key:secret-key}")
    private String secretKey;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(String username) {
        Date curr = new Date();
        Date valid = new Date(curr.getTime() + 3600000);
        
        return JWT.create()
                .withIssuer("T6xyz-Backend-Service")
                .withIssuedAt(curr)
                .withExpiresAt(valid)
                .withClaim("username", username)
                .sign(Algorithm.HMAC256(this.secretKey));
    }
 
    public Authentication validateJWT(String token) throws Exception {
        Algorithm algo = Algorithm.HMAC256(this.secretKey);
        JWTVerifier verifier = JWT.require(algo).build();
        DecodedJWT decoded = verifier.verify(token);

        try {
            String userName = decoded.getClaim("username").toString();
            List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("USER"));

            return new UsernamePasswordAuthenticationToken(userName, null, authorities);

        } catch (Exception e) {
            throw new Exception(e);
        }
    }
}
