package com.T6xyz_Service.backend.services.user;

import java.nio.CharBuffer;
import java.util.Optional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.T6xyz_Service.backend.model.Credentials;
import com.T6xyz_Service.backend.model.User;
// import com.T6xyz_Service.backend.services.repositories.PremiumRepository;
import com.T6xyz_Service.backend.services.repositories.UserRepository;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepo;
    public final PasswordEncoder passwordEncoder;
    // private final PremiumRepository premiumRepo;

    @Override
    public String createUser(User userInput) {
        Optional<User> userEntity = userRepo.findByProperty("username", userInput.getUsername());

        if (userEntity.isEmpty()) {
            try {
                userInput.setPassword(passwordEncoder.encode(CharBuffer.wrap(userInput.getPassword())));
                userRepo.save(userInput);
                return userInput.getUsername();
            } catch (RuntimeException e) {
                throw new RuntimeException(e);
            }
        } else {
            throw new IllegalArgumentException("User " + userInput.getUsername() + " already exists");
        }
    }

    @Override
    public String findUser(Credentials credentialsInput) {
        Optional<User> userEntity = userRepo.findByProperty("username", credentialsInput.getUsername());

        if (!userEntity.isEmpty()) {
            User foundUser = userEntity.get();

            if (passwordEncoder.matches(CharBuffer.wrap(credentialsInput.getPassword()), foundUser.getPassword())) {
                return credentialsInput.getUsername();
            } else {
                throw new RuntimeException("Password is incorrect");
            }
        } else {
            throw new IllegalArgumentException("User " + credentialsInput.getUsername() + " could not be found");
        }
    }
}
