package com.ambersuman.infraTrack.services;

import com.ambersuman.infraTrack.config.SecurityConfig;
import com.ambersuman.infraTrack.entities.Product;
import com.ambersuman.infraTrack.models.GlobalResponse;
import com.ambersuman.infraTrack.models.productModels.OrderRequest;
import com.ambersuman.infraTrack.repository.ProductRepository;
import com.ambersuman.infraTrack.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
//                request.getProductQuantity() + " " + request.getProjectName());

        if(request.getProductName() == "" ||
                request.getProductQuantity() == "" ||
                request.getOrderedBy() == 0 ||
                request.getProjectName() == "")
        {
            GlobalResponse response = new GlobalResponse("Product Name, Quantity and Project Name is required Field",
                    System.currentTimeMillis(), HttpStatus.BAD_REQUEST.value());

            return ResponseEntity.status(HttpStatus.BAD_REQUEST.value()).body(response);
        }

        if(request.getEngineerComments() == "")
        {
            newProduct = new Product(request.getProductName(),
                    request.getProductQuantity(), request.getOrderedBy(), request.getProjectName(), request.getOrderDate());

            newProduct.setLastModifiedBy(request.getOrderedBy());
        }
        else
        {
            newProduct = new Product(request.getProductName(), request.getProductQuantity(),
                    request.getOrderedBy(), request.getProjectName(), request.getOrderDate(), request.getEngineerComments());

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

    public ResponseEntity viewOrders(int id) {

        try
        {
            Optional<List<Product>> finder = productRepository.findByOrderedBy(id);
            List<Product> orders = finder.get();
            if(orders.isEmpty())
            {
                GlobalResponse res = new GlobalResponse("No Orders Available", System.currentTimeMillis(),
                        202, orders);
                return ResponseEntity.ok(res);
            }
            else
            {
//                orders = finder.get();
                GlobalResponse res = new GlobalResponse("Orders", System.currentTimeMillis(),
                        202, orders);
                return ResponseEntity.ok(res);
            }
        }
        catch (Exception e)
        {
            GlobalResponse res = new GlobalResponse("Something Went Wrong", System.currentTimeMillis(),
                    500);
            return ResponseEntity.ok(res);
        }

    }
}
