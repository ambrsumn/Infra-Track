package com.ambersuman.infraTrack.services;
import com.ambersuman.infraTrack.models.*;
import com.ambersuman.infraTrack.models.authModels.AuthRequest;
import com.ambersuman.infraTrack.models.authModels.AuthResponse;
import com.ambersuman.infraTrack.models.authModels.PasswordChangeRequest;
import com.ambersuman.infraTrack.models.authModels.RegistrationRequest;
import com.ambersuman.infraTrack.repository.UserRepository;
import com.ambersuman.infraTrack.utils.JwtUtil;
import com.ambersuman.infraTrack.entities.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public AuthService(
            AuthenticationManager authenticationManager,
            CustomUserDetailsService userDetailsService,
            JwtUtil jwtUtil,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void regenerateToken(String email, String roleName)
    {
        UserDetails userDetails = userDetailsService.loadUserByUsername(email);

        String newToken = jwtUtil.generateToken(userDetails, roleName);

        System.out.println("new token " + newToken);
    }

    public ResponseEntity login(AuthRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
        } catch (BadCredentialsException ex) {
//            return new AuthResponse("", "Invalid Email or Password", false);
            GlobalResponse response = new GlobalResponse("Invalid Email or Password", System.currentTimeMillis(), HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.badRequest().body(response);
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());

//        System.out.println(userDetails.getUsername());

         User user = userRepository.findByEmail(request.getEmail()).orElseThrow();

//             System.out.println("YES");
//             User receivedUser = user.get();
             String jwt = jwtUtil.generateToken(userDetails, user.getRoleName());

            UserDetailsResponse userObject = new UserDetailsResponse(user.getFirstName(),
                    user.getId(), user.getEmail(), user.getRoleName(), user.getLastName(), user.getCompanyName(), user.getPhone(), user.getProfileImage());

            AuthResponse response = new AuthResponse(jwt, "Logged In successfully", true, userObject);
             return ResponseEntity.ok(response);


//        System.out.println(jwt);
//        return new AuthResponse("", "Email Id or password provided is incorrect");
    }

    public ResponseEntity register(RegistrationRequest request) throws Exception
    {
        String encodedPassWord = passwordEncoder.encode(request.getAccountPassword());
        byte[] imageBytes = null;

        if(request.getProfileImage() != null)
        {
            imageBytes = request.getProfileImage().getBytes();
        }

        User newUser = new User(request.getFirstName(), request.getLastName(), request.getEmail(), request.getPhone(), request.getRoleName(), request.getSecurityCode(), encodedPassWord, request.getCompanyName(), imageBytes);

        System.out.println(newUser.toString());

        User savedUser = userRepository.save(newUser);


        GlobalResponse res = new GlobalResponse("Registration Completed, please login to continue",
                System.currentTimeMillis(),
                202);

        return ResponseEntity.ok(res);
    }

    public ResponseEntity resetPassword(PasswordChangeRequest request) throws Exception {

        GlobalResponse response;

        User requestedUser = userRepository.findByEmail(request.getEmail()).orElseThrow(()->new Exception("User Not Found"));
        if(!requestedUser.getSecurityCode().equals(request.getSecurityCode())) throw new Exception("Incorrect Security Code");

        String encodedPassword = passwordEncoder.encode(request.getPassword());
        requestedUser.setAccountPassword(encodedPassword);
        userRepository.save(requestedUser);


        response = new GlobalResponse("Password Changed!, Login to continue",
                System.currentTimeMillis(), 200);

        return ResponseEntity.ok(response);
    }

    public ResponseEntity updateProfile(RegistrationRequest request) throws Exception {

        User foundUser = userRepository.findByFirstName(request.getFirstName()).orElseThrow(()-> new Exception("User Not Found"));


        if(foundUser.getPhone() != request.getPhone())foundUser.setPhone(request.getPhone());
        if(foundUser.getEmail() != request.getEmail())foundUser.setEmail(request.getEmail());
        if(foundUser.getRoleName() != request.getRoleName())foundUser.setRoleName(request.getRoleName());

        if(request.getProfileImage() != null)
        {
            System.out.println("YES");
            byte[] imageBytes = request.getProfileImage().getBytes();
            foundUser.setProfileImage(imageBytes);
        }

        User savedUser = userRepository.save(foundUser);
        System.out.println(savedUser.getId());
//        System.out.println("no error");
        GlobalResponse res = new GlobalResponse("Profile Updated SucessFully", System.currentTimeMillis(), 202);
//        System.out.println(res.getMessage());
//        System.out.println(res.getStatus());

        return ResponseEntity.ok().body(res);
    }
}