package com.ambersuman.infraTrack.services;

import com.ambersuman.infraTrack.entities.Product;
import com.ambersuman.infraTrack.models.GlobalResponse;
import com.ambersuman.infraTrack.models.productModels.DirectorUpdateOrderDetails;
import com.ambersuman.infraTrack.models.productModels.StoreUpdateOrderDetails;
import com.ambersuman.infraTrack.repository.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DirectorService {

    private ProductRepository productRepository;

    public DirectorService(){}

    public DirectorService(ProductRepository productRepository)
    {
        this.productRepository = productRepository;
    }


    public ResponseEntity updateOrder(DirectorUpdateOrderDetails request) {

        try
        {
            Optional<Product> finder = productRepository.findById(request.getId());
            Product selectedProduct = finder.get();
            if(request.getStatus() != "")selectedProduct.setStatus(request.getStatus());
//            if(request.getFinalizedQuantity() != 0)selectedProduct.setFinalizedQuantity(request.getFinalizedQuantity());
            if(request.getDirectorRemarks() != "")selectedProduct.setDirectorRemarks(request.getDirectorRemarks());

            productRepository.save(selectedProduct);

            GlobalResponse response = new GlobalResponse("Updated Order Details",
                    System.currentTimeMillis(), 202);
            return ResponseEntity.ok(response);

        }
        catch (Exception e)
        {
            System.out.println(e.getMessage());
            GlobalResponse response = new GlobalResponse("Something Went Wrong, Try Again Later",
                    System.currentTimeMillis(), HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.internalServerError().body(response);
        }
    }
}
