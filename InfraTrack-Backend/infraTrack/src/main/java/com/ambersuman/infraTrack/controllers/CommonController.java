package com.ambersuman.infraTrack.controllers;

import com.ambersuman.infraTrack.entities.User;
import com.ambersuman.infraTrack.models.GlobalResponse;
import com.ambersuman.infraTrack.models.UserDetailsResponse;
import com.ambersuman.infraTrack.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/common")
public class CommonController  {

    private UserRepository userRepository;

    @Autowired
    public CommonController(UserRepository userRepository)
    {
        this.userRepository = userRepository;
    }

    @GetMapping("/test")
    public String Test()
    {
        return "Hi from Common Controller";
    }

    @GetMapping("/getAllUsers")
    public List<User> getAllUsers()
    {
        return userRepository.findAll();
    }

    @GetMapping("/profile/{id}")
    public ResponseEntity<UserDetailsResponse> getUserDetails(@PathVariable int id)
    {
        Optional<User> foundUser = userRepository.findById(id);

        if(foundUser.isEmpty())
        {
            return ResponseEntity.notFound().build();
        }

        User receivedUser = foundUser.get();
        UserDetailsResponse response = new UserDetailsResponse(receivedUser.getFirstName(),
                receivedUser.getId(),
                receivedUser.getEmail(),
                receivedUser.getRoleName(),
                receivedUser.getLastName(),
                receivedUser.getCompanyName(),
                receivedUser.getProfileImage());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/profileimage/{id}")
    public ResponseEntity<byte[]> getUserProfile(@PathVariable int id)
    {
        Optional<User> foundUser = userRepository.findById(id);

        if(foundUser.isEmpty())
        {
            return ResponseEntity.notFound().build();
        }

        User receivedUser = foundUser.get();


        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(receivedUser.getProfileImage());
    }
}
