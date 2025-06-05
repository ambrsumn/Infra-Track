package com.ambersuman.infraTrack.services;

import com.ambersuman.infraTrack.entities.Product;
import com.ambersuman.infraTrack.models.GlobalResponse;
import com.ambersuman.infraTrack.models.productModels.OrderRequest;
import com.ambersuman.infraTrack.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class EngineerService {

    private ProductRepository productRepository;

    @Autowired
    public EngineerService(ProductRepository productRepository)
    {
        this.productRepository = productRepository;
    }

    public ResponseEntity placeOrder(OrderRequest request)
    {
        Product newProduct;

//        System.out.println(request.getProductName() + " " + request.getOrderedBy() + " " +
//                request.getProductQuantity() + " " + request.getprojectName());

        if(request.getProductName() == "" ||
                request.getProductQuantity() == "" ||
                request.getOrderedBy() == 0 ||
                request.getprojectName() == "")
        {
            GlobalResponse response = new GlobalResponse("Product Name, Quantity and Project Name is required Field",
                    System.currentTimeMillis(), HttpStatus.BAD_REQUEST.value());

            return ResponseEntity.status(HttpStatus.BAD_REQUEST.value()).body(response);
        }

        if(request.getEngineerComments() == "")
        {
            newProduct = new Product(request.getProductName(),
                    request.getProductQuantity(), request.getOrderedBy(), request.getprojectName());

            newProduct.setLastModifiedBy(request.getOrderedBy());
        }
        else
        {
            newProduct = new Product(request.getProductName(), request.getProductQuantity(),
                    request.getOrderedBy(), request.getprojectName(), request.getEngineerComments());

            newProduct.setLastModifiedBy(request.getOrderedBy());

        }

        try
        {
            productRepository.save(newProduct);
            GlobalResponse response = new GlobalResponse("Order Placed", System.currentTimeMillis(), 202);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            GlobalResponse response = new GlobalResponse("Internal Server Error",
                    System.currentTimeMillis(), 500);

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR.value()).body(response);
        }
    }

    public ResponseEntity deleteOrder(int orderId) {

        try
        {
            productRepository.deleteById(orderId);
            GlobalResponse response = new GlobalResponse("Order Deleted", System.currentTimeMillis(), 202);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            GlobalResponse response = new GlobalResponse("Internal Server Error",
                    System.currentTimeMillis(), 500);

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR.value()).body(response);
        }
    }
}
