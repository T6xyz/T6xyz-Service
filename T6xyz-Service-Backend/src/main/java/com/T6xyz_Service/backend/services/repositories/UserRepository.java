package com.T6xyz_Service.backend.services.repositories;

import org.springframework.stereotype.Service;
import com.T6xyz_Service.backend.model.User;
import com.mongodb.client.MongoCollection;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class UserRepository implements Repository<User> {
    private final MongoCollection<User> userCollection;

    @Override
    public MongoCollection<User> getMongoCollection() {
        return this.userCollection;
    }
}
