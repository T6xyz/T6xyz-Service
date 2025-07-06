package com.T6xyz_Service.backend.services.repositories;

import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.T6xyz_Service.backend.model.User;
import com.mongodb.client.MongoCollection;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class UserRepository implements Repository<User> {
    private final MongoCollection<User> userCollection;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public MongoCollection<User> getMongoCollection() {
        return this.userCollection;
    }
}
