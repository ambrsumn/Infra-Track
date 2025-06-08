package com.ambersuman.infraTrack.controllers;

import com.ambersuman.infraTrack.models.productModels.ProductUpdateDTO;
import com.ambersuman.infraTrack.services.CommonService;
import com.ambersuman.infraTrack.services.DirectorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/director")
public class DirectorController {

    private CommonService commonService;
    private DirectorService directorService;

    public DirectorController(CommonService commonService, DirectorService directorService)
    {
        this.commonService = commonService;
        this.directorService = directorService;
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
        return commonService.viewOrdersBy(name);
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
