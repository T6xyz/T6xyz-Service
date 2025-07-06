package com.T6xyz_Service.backend.services.repositories;

import org.springframework.stereotype.Service;
import com.T6xyz_Service.backend.model.Premium;
import com.mongodb.client.MongoCollection;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class PremiumRepository implements Repository<Premium> {
    private final MongoCollection<Premium> premiumCollection;

    @Override
    public MongoCollection<Premium> getMongoCollection() {
        return this.premiumCollection;
    }
}
