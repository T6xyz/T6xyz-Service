package com.T6xyz_Service.backend.services.user;

import com.T6xyz_Service.backend.model.Credentials;
import com.T6xyz_Service.backend.model.User;

public interface UserService {
    public String createUser(User userInput);

    public String findUser(Credentials credentialsInput);
} 
