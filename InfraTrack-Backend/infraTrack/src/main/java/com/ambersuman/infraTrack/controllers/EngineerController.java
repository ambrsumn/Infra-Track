package com.ambersuman.infraTrack.controllers;

import com.ambersuman.infraTrack.models.GlobalResponse;
import com.ambersuman.infraTrack.models.productModels.OrderRequest;
import com.ambersuman.infraTrack.services.EngineerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/engineer")
public class EngineerController {

    private EngineerService engineerService;

    @Autowired
    public EngineerController(EngineerService engineerService)
    {
        this.engineerService = engineerService;
    }

    @GetMapping("/test")
    public String Test()
    {
        return "Hi from Engineer Controller";
    }

    @PostMapping("/place-order")
    public ResponseEntity placeOrder(@RequestBody OrderRequest request)
    {
        return this.engineerService.placeOrder(request);
    }

    @DeleteMapping("/place-order/{orderId}")
    public ResponseEntity deleteOrder(@PathVariable("orderId") int orderId)
    {
        return this.engineerService.deleteOrder(orderId);
    }
}
