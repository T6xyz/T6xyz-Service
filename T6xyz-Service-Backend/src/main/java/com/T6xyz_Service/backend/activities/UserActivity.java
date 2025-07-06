package com.T6xyz_Service.backend.activities;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.T6xyz_Service.backend.config.AuthProvider;
import com.T6xyz_Service.backend.model.Credentials;
import com.T6xyz_Service.backend.model.User;
import com.T6xyz_Service.backend.services.user.UserServiceImpl;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
@RestController
@RequestMapping("/com/T6xyz-Backend-Service/users")
public class UserActivity {
    private final UserServiceImpl userService;

    private final AuthProvider authProvider;

    @GetMapping("/Echo")
    @PreAuthorize("hasAuthority('USER')")
    public String echo() {
        return "Echoed String!";
    }

    @PostMapping("/RegisterUser")
    public String registerUser(@RequestBody User request) {
        String username = userService.createUser(request);
        String token = authProvider.createToken(username);
        return token;
    }

    @PostMapping("/LoginUser")
    public String loginUser(@RequestBody Credentials request) {
        String username =  userService.findUser(request);
        String token = authProvider.createToken(username);
        return token;
    }
}
