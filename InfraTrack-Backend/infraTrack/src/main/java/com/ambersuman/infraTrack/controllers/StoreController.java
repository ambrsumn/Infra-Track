package com.ambersuman.infraTrack.controllers;

import com.ambersuman.infraTrack.models.productModels.AddStocksRequest;
import com.ambersuman.infraTrack.models.productModels.StoreUpdateOrderDetails;
import com.ambersuman.infraTrack.services.CommonService;
import com.ambersuman.infraTrack.services.StoreService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/store")
public class StoreController {

    private CommonService commonService;
    private StoreService storeService;

    public StoreController(CommonService commonService, StoreService storeService)
    {
        this.commonService = commonService;
        this.storeService = storeService;
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

    @PostMapping("/add-stock")
    public ResponseEntity addStocks(@RequestBody AddStocksRequest request)
    {
        System.out.println(request);
        return storeService.addStocks(request);
    }

    @GetMapping("/check-in-store/{productName}")
    public ResponseEntity checkForProduct(@PathVariable String productName)
    {
        return storeService.checkForProduct(productName);
    }

    @PostMapping("/update-order")
    public ResponseEntity updateOrder(@RequestBody StoreUpdateOrderDetails request)
    {
        return storeService.updateOrder(request);
    }
}
