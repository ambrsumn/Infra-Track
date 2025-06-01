package com.ambersuman.infraTrack.services;

import com.ambersuman.infraTrack.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class CommonService {

    private UserRepository userRepository;

    @Autowired
    public CommonService(UserRepository userRepository)
    {
        this.userRepository = userRepository;
    }


}
