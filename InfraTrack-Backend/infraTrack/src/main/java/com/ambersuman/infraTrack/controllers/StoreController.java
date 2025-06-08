package com.ambersuman.infraTrack.controllers;

import com.ambersuman.infraTrack.models.productModels.AddStocksRequest;
import com.ambersuman.infraTrack.models.productModels.ProductUpdateDTO;
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

    @GetMapping("/test")
    public String Test()
    {
        return "Hi from Engineer Controller";
    }

    @GetMapping("/view-orders")
    public ResponseEntity viewAllOrders()
    {
        return commonService.viewAllOrders();
    }

    @GetMapping("/view-orders-by/{name}")
    public ResponseEntity viewOrdersByName(@PathVariable String name) throws Exception
    {
//        System.out.println(name);
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

    @GetMapping("view-order/{id}")
    public ResponseEntity viewOrderById(@PathVariable int id) throws Exception
    {
        return commonService.viewOrderById(id);
    }

    @PutMapping("/update-order")
    public ResponseEntity updateOrder(@ModelAttribute ProductUpdateDTO request) throws Exception
    {
        return commonService.updateOrder(request);
    }
}
