package com.T6xyz_Service.backend.mongo;

import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.ClassModel;
import org.bson.codecs.pojo.PojoCodecProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.T6xyz_Service.backend.model.Premium;
import com.T6xyz_Service.backend.model.User;
import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.IndexOptions;
import com.mongodb.client.model.Indexes;

import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

@Configuration
public class MongoModule {
    private final String DB_NAME = "t6xyzService";

    @Bean
    public MongoClient getMongoClient() {
        String uri = String.format("mongodb+srv://%s:%s@%s.1hy8n.mongodb.net/?retryWrites=true&w=majority&appName=T6xyzCluster",
        System.getenv("DB_USER"), System.getenv("DB_PASS"), System.getenv("DB_CLUSTER"));

        return MongoClients.create(
            MongoClientSettings.builder()
            .applyConnectionString(new ConnectionString(uri))
            .build());
    }

    @Bean
    public MongoDatabase getMongoDatabase(MongoClient client) {
        return client.getDatabase(DB_NAME);
    }

    @Bean
    public MongoCollection<User> getUserCollection(MongoDatabase database) {
        CodecRegistry codecRegistry = buildCodeRegistry(User.class);

        MongoCollection<User> userCollection = database.getCollection("users", User.class)
        .withCodecRegistry(codecRegistry);

        createIndex(userCollection, "username", true);        

        return userCollection;
    }

    @Bean
    public MongoCollection<Premium> getPremiumCollection(MongoDatabase database) {
        CodecRegistry codecRegistry = buildCodeRegistry(User.class);

        MongoCollection<Premium> premiumCollection = database.getCollection("premiums", Premium.class)
        .withCodecRegistry(codecRegistry);

        createIndex(premiumCollection, "username", true);        

        return premiumCollection;
    }

    private void createIndex(MongoCollection<?> collection, String fieldName, boolean unique) {
        IndexOptions indexOptions = new IndexOptions().unique(unique).name(String.format("%sIndex", fieldName));
        collection.createIndex(Indexes.ascending(fieldName), indexOptions);
    }

    private static CodecRegistry buildCodeRegistry(Class<?> entityType) {
        ClassModel<?> classModel = ClassModel.builder(entityType).idPropertyName("id").build();
        CodecRegistry pojoCodecRegistry = fromProviders(PojoCodecProvider.builder()
        .automatic(true).register(classModel).build());

        return fromRegistries(MongoClientSettings.getDefaultCodecRegistry(), pojoCodecRegistry);
    }
}
