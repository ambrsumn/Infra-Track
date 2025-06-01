package com.ambersuman.infraTrack.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/engineer")
public class EngineerController {

    @GetMapping("/test")
    public String Test()
    {
        return "Hi from Engineer Controller";
    }
}
