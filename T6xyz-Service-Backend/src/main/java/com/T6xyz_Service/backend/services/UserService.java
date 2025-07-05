package com.T6xyz_Service.backend.services;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserService {

    @GetMapping("/echo")
    public String echo() {
        return "Echoed String!";
    }
}
