package com.T6xyz_Service.backend.services.repositories;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.bson.Document;
import org.bson.types.ObjectId;
import com.mongodb.MongoException;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.FindOneAndReplaceOptions;
import com.mongodb.client.model.ReturnDocument;
import com.mongodb.client.model.Updates;

public interface Repository<T> {
    String ID_FIELD = "_id";

    default T save(T item) {
        if (item != null) {
            String idValue = this.getIdValue(item);

            if (idValue == null) {
                idValue = ObjectId.get().toHexString();
            }

            FindOneAndReplaceOptions returnDocAfterReplace = new FindOneAndReplaceOptions()
                .returnDocument(ReturnDocument.AFTER).upsert(true);

            try {
                return getMongoCollection().findOneAndReplace(getFilterByProperty(ID_FIELD, idValue),
                item, returnDocAfterReplace);
            } catch (MongoException e) {
                throw new RuntimeException(e.getMessage());
            }
        }
        return null;
    }

    default Optional<T> findById(String id) {
        if (id != null) {
            return Optional.ofNullable(getMongoCollection().find(getFilterByProperty(ID_FIELD, id)).first());
        }
        return Optional.empty();
    }

    default List<T> findAll() {
        return getMongoCollection().find().into(new ArrayList<>());
    }

    default void delete(T item) {
        getMongoCollection().deleteOne(getFilterByProperty(ID_FIELD, getIdValue(item)));
    }

    default void updateByProperty(String id, String property, Object value) {
        getMongoCollection().findOneAndUpdate(getFilterByProperty(ID_FIELD, id), Updates.set(property, value));
    }

    default List<T> findByProperty(String name, Object value) {
        return getMongoCollection().find(getFilterByProperty(name, value)).into(new ArrayList<>());
    }

    private Document getFilterByProperty(String property, Object value) {
        return new Document(property, value);
    }

    MongoCollection<T> getMongoCollection();

    private String getIdValue(T item) {
        for (Method method : item.getClass().getMethods()) {
            if (method.getName().equals("getId")) {
                try {
                    return (String) method.invoke(item);
                } catch (IllegalAccessException | InvocationTargetException e) {
                    throw new RuntimeException(e);
                }
            }
        }

        return null;
    }
}