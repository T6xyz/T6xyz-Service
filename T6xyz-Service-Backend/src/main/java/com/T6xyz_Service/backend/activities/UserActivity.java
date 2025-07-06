package com.T6xyz_Service.backend.activities;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.T6xyz_Service.backend.model.User;
import com.T6xyz_Service.backend.services.user.UserServiceImpl;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
@RestController
@RequestMapping("/com/T6xyz-Backend-Service")
public class UserActivity {
    private final UserServiceImpl userService;

    @GetMapping("/echo")
    public String echo() {
        return "Echoed String!";
    }

    @PostMapping("/login")
    public String login(@RequestBody User request) {
        return userService.createUser(request);
    }
}
