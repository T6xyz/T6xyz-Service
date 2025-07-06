package com.T6xyz_Service.backend.services.user;

import org.springframework.stereotype.Service;

import com.T6xyz_Service.backend.model.User;
// import com.T6xyz_Service.backend.services.repositories.PremiumRepository;
import com.T6xyz_Service.backend.services.repositories.UserRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepo;
    // private final PremiumRepository premiumRepo;

    @Override
    public String createUser(User userInput) {
        userRepo.save(userInput);
        return "success";
    }
}
