package com.ambersuman.infraTrack.controllers;

import com.ambersuman.infraTrack.entities.Product;
import com.ambersuman.infraTrack.models.GlobalResponse;
import com.ambersuman.infraTrack.models.productModels.OrderRequest;
import com.ambersuman.infraTrack.models.productModels.ProductUpdateDTO;
import com.ambersuman.infraTrack.services.CommonService;
import com.ambersuman.infraTrack.services.EngineerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/engineer")
public class EngineerController {

    private EngineerService engineerService;
    private CommonService commonService;

    @Autowired
    public EngineerController(EngineerService engineerService, CommonService commonService)
    {
        this.engineerService = engineerService;
        this.commonService = commonService;
    }

    @GetMapping("/test")
    public String Test()
    {
        return "Hi from Engineer Controller";
    }

    @PostMapping("/place-order")
    public ResponseEntity placeOrder(@RequestBody OrderRequest request) throws Exception
    {
        return this.engineerService.placeOrder(request);
    }

    @DeleteMapping("/delete-order/{orderId}")
    public ResponseEntity deleteOrder(@PathVariable("orderId") int orderId)
    {
        return this.engineerService.deleteOrder(orderId);
    }


    @GetMapping("/orders/{id}")
    public ResponseEntity viewOrders(@PathVariable int id)
    {
        return this.engineerService.viewOrders(id);
    }

    @PutMapping("/update-order")
    public ResponseEntity updateOrder(@ModelAttribute ProductUpdateDTO request) throws Exception
    {
        return commonService.updateOrder(request);
    }



    @GetMapping("view-order/{id}")
    public ResponseEntity viewOrderById(@PathVariable int id) throws Exception
    {
        return commonService.viewOrderById(id);
    }
}
