package com.ambersuman.infraTrack.services;


import com.ambersuman.infraTrack.entities.User;
import com.ambersuman.infraTrack.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;

import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//        System.out.println(email);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with email: " + email)
                );

//        System.out.println(user.toString());

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getAccountPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRoleName()))
        );
    }
}