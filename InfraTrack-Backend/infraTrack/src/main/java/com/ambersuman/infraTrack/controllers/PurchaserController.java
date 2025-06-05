package com.ambersuman.infraTrack.controllers;

import com.ambersuman.infraTrack.services.CommonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/purchaser")
public class PurchaserController {

    private CommonService commonService;

    public PurchaserController(CommonService commonService)
    {
        this.commonService = commonService;
    }

    @GetMapping("/view-orders")
    public ResponseEntity viewAllOrders()
    {
        return commonService.viewAllOrders();
    }

    @GetMapping("/view-orders-by/{name}")
    public ResponseEntity viewOrdersByName(@PathVariable String name)
    {
        return commonService.viewOrdersBy(name);
    }
}
