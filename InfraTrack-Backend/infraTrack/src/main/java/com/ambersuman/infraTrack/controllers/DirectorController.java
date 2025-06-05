package com.ambersuman.infraTrack.controllers;

import com.ambersuman.infraTrack.models.productModels.DirectorUpdateOrderDetails;
import com.ambersuman.infraTrack.models.productModels.StoreUpdateOrderDetails;
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

    @PostMapping("/update-order")
    public ResponseEntity updateOrder(@RequestBody DirectorUpdateOrderDetails request)
    {
        return directorService.updateOrder(request);
    }
}
