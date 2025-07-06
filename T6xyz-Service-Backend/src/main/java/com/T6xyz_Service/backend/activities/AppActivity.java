package com.T6xyz_Service.backend.activities;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/com/T6xyz-Backend-Service/app")
public class AppActivity {

    @GetMapping("/GetLandingPage")
    @PreAuthorize("hasAuthority('USER')")
    public String echo() {
        return "success";
    }
}