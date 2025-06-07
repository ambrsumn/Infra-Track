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

    public GlobalResponse register(RegistrationRequest request)
    {
        String encodedPassWord = passwordEncoder.encode(request.getAccountPassword());
//        System.out.println("encoded password" +  encodedPassWord);
        byte[] imageBytes = null;

        try
        {
            if(request.getProfileImage() != null)
            {
                imageBytes = request.getProfileImage().getBytes();
            }
        }
        catch(IOException e)
        {
            System.out.println(e);
        }

//        User newUser = new User(request.getFirstName(), request.getLastName(), request.getEmail(), request.getPhone(), request.getRoleName(), request.getSecurityCode(), encodedPassWord);
        User newUser = new User(request.getFirstName(), request.getLastName(), request.getEmail(), request.getPhone(), request.getRoleName(), request.getSecurityCode(), encodedPassWord, request.getCompanyName(), imageBytes);

        System.out.println(newUser.toString());

        try
        {
            User savedUser = userRepository.save(newUser);
//            System.out.println(savedUser.getId());
//            System.out.println("no error");
        }
        catch (DataIntegrityViolationException e)
        {
//            System.out.println("DUPLICATEEEEEEEEE");
//            System.out.println("Duplicatee entry" + e.getMessage());
            return new GlobalResponse("An Account Already Exists With This Email",
                    System.currentTimeMillis(),
                    HttpStatus.INTERNAL_SERVER_ERROR.value());
        }
        catch (Exception e)
        {
//            System.out.println("OTHEEEEEEEEE");

            System.out.println("Other Exception" + e.getMessage());
            return new GlobalResponse("Registration Failed, please try later",
                    System.currentTimeMillis(),
                    HttpStatus.INTERNAL_SERVER_ERROR.value());
        }


        return new GlobalResponse("Registration Completed, please login to continue",
                System.currentTimeMillis(),
                202);
    }

    public GlobalResponse resetPassword(PasswordChangeRequest request) {

        GlobalResponse response;
        try
        {
            Optional<User> requestedUser = userRepository.findByEmail(request.getEmail());
            if(requestedUser.isEmpty())
            {
                response = new GlobalResponse("Incorrect Email",
                        System.currentTimeMillis(), HttpStatus.BAD_REQUEST.value());
                return response;
            }

            User verifiedUser = requestedUser.get();
            if(!verifiedUser.getSecurityCode().equals(request.getSecurityCode()))
            {
                response = new GlobalResponse("Incorrect Security Code",
                        System.currentTimeMillis(), HttpStatus.BAD_REQUEST.value());
                return response;
            }

//            try
//            {
                String encodedPassword = passwordEncoder.encode(request.getPassword());
                verifiedUser.setAccountPassword(encodedPassword);
                userRepository.save(verifiedUser);



//            }
//            catch (Exception e)
//            {
//                response = new GlobalResponse("Something went wrong, please try later",
//                        System.currentTimeMillis(), HttpStatus.INTERNAL_SERVER_ERROR.value());
//                return response;
//            }
        }
        catch (Exception e)
        {
            System.out.println(e.getMessage());
            response = new GlobalResponse("Something Went Wrong!",
                    System.currentTimeMillis(), HttpStatus.INTERNAL_SERVER_ERROR.value());
            return response;
        }

        response = new GlobalResponse("Password Changed!, Login to continue",
                System.currentTimeMillis(), 200);
        return response;
//        return new GlobalResponse("hi", System.currentTimeMillis(), 202);
    }

    public GlobalResponse updateProfile(RegistrationRequest request) {

        System.out.println(request.getProfileImage());
        System.out.println(request.getPhone());
        System.out.println(request.getFirstName());
        System.out.println(request.getProfileImage());



        try
        {
            Optional<User> finder = userRepository.findByFirstName(request.getFirstName());
            User foundUser = finder.get();

            System.out.println(foundUser.getPhone());

            if(foundUser.getPhone() != request.getPhone())foundUser.setPhone(request.getPhone());
            if(foundUser.getEmail() != request.getEmail())foundUser.setEmail(request.getEmail());
            if(foundUser.getRoleName() != request.getRoleName())foundUser.setRoleName(request.getRoleName());

            if(request.getProfileImage() != null)
            {
                System.out.println("YES");
                byte[] imageBytes = request.getProfileImage().getBytes();
                foundUser.setProfileImage(imageBytes);
            }

            try
            {
                System.out.println("YESS");
                User savedUser = userRepository.save(foundUser);
                System.out.println(savedUser.getId());
                System.out.println("no error");
                GlobalResponse res = new GlobalResponse("Profile Updated SucessFully", System.currentTimeMillis(), 202);
                return res;

            }
            catch (Exception e) {
                System.out.println(e.getMessage());
                GlobalResponse res = new GlobalResponse(e.getMessage(), System.currentTimeMillis(), 500);
                return res;
            }


        }
        catch(Exception e)
        {
            System.out.println("236 " +  e.getMessage());

            GlobalResponse res = new GlobalResponse(e.getMessage(), System.currentTimeMillis(), 500);
            return res;
        }
    }
}