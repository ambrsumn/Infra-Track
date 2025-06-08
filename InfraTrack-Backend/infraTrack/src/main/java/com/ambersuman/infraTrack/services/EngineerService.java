package com.ambersuman.infraTrack.services;

import com.ambersuman.infraTrack.config.SecurityConfig;
import com.ambersuman.infraTrack.entities.Product;
import com.ambersuman.infraTrack.entities.User;
import com.ambersuman.infraTrack.models.GlobalResponse;
import com.ambersuman.infraTrack.models.productModels.OrderRequest;
import com.ambersuman.infraTrack.repository.ProductRepository;
import com.ambersuman.infraTrack.repository.UserRepository;
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
    private UserRepository userRepository;

    @Autowired
    public EngineerService(ProductRepository productRepository, UserRepository userRepository)
    {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public ResponseEntity placeOrder(OrderRequest request) throws Exception
    {
        Product newProduct;

        if(request.getProductName() == "" ||
                request.getProductQuantity() == "" ||
                request.getOrderedBy() == 0 ||
                request.getProjectName() == "")
        {
            GlobalResponse response = new GlobalResponse("Product Name, Quantity and Project Name is required Field",
                    System.currentTimeMillis(), HttpStatus.BAD_REQUEST.value());

            return ResponseEntity.status(HttpStatus.BAD_REQUEST.value()).body(response);
        }

        User customer = userRepository.findById(request.getOrderedBy()).orElseThrow(()-> new Exception("User Not Found"));

        if(request.getEngineerComments() == "")
        {
            newProduct = new Product(request.getProductName(),
                    request.getProductQuantity(), request.getOrderedBy(), request.getProjectName(), request.getOrderDate(), customer.getFirstName() + " " + customer.getLastName());

        }
        else
        {
            newProduct = new Product(request.getProductName(), request.getProductQuantity(),
                    request.getOrderedBy(), request.getProjectName(), request.getOrderDate(), request.getEngineerComments(), customer.getFirstName() + " " + customer.getLastName());


        }
        newProduct.setLastModifiedBy(request.getOrderedBy());
        newProduct.setStatus("Pending");

        productRepository.save(newProduct);
        GlobalResponse response = new GlobalResponse("Order Placed", System.currentTimeMillis(), 202);
        return ResponseEntity.ok(response);
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
