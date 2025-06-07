package com.ambersuman.infraTrack.controllers;
import com.ambersuman.infraTrack.models.authModels.AuthRequest;
import com.ambersuman.infraTrack.models.authModels.PasswordChangeRequest;
import com.ambersuman.infraTrack.models.authModels.RegistrationRequest;
import com.ambersuman.infraTrack.models.GlobalResponse;
import com.ambersuman.infraTrack.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private final AuthService authService;

    @Autowired
    public AuthenticationController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/test")
    public String test() {
        return "HELLO";
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody AuthRequest request) {
        return authService.login(request);
    }

    @PostMapping("/register")
    public GlobalResponse login(@ModelAttribute RegistrationRequest request) {
        return authService.register(request);
    }

    @PostMapping("/reset-password")
    public GlobalResponse resetPassword(@RequestBody PasswordChangeRequest request)
    {
        return authService.resetPassword(request);
    }

    @PutMapping("/update-profile")
    public GlobalResponse updateProfile(@ModelAttribute RegistrationRequest request)
    {
        return authService.updateProfile(request);
    }

//    @GetMapping("/")
}
