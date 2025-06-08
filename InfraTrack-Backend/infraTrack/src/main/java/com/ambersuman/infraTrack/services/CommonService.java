package com.ambersuman.infraTrack.services;

import com.ambersuman.infraTrack.entities.Product;
import com.ambersuman.infraTrack.entities.User;
import com.ambersuman.infraTrack.models.GlobalResponse;
import com.ambersuman.infraTrack.models.productModels.ProductUpdateDTO;
import com.ambersuman.infraTrack.repository.ProductRepository;
import com.ambersuman.infraTrack.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.ExpressionException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CommonService {

    private UserRepository userRepository;
    private ProductRepository productRepository;

    @Autowired
    public CommonService(UserRepository userRepository, ProductRepository productRepository)
    {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    public ResponseEntity viewAllOrders()
    {
//        System.out.println("API CALLED");
        List<Product> allOrders = new ArrayList<>();
        allOrders = productRepository.findAll();

        if(allOrders.isEmpty())
        {
            GlobalResponse response = new GlobalResponse("No Orders available", System.currentTimeMillis(),
                    202, allOrders);
            return ResponseEntity.ok(response);
        }

        GlobalResponse response = new GlobalResponse("All Orders Placed till date", System.currentTimeMillis(),
                200, allOrders);
//        return ResponseEntity.internalServerError().body(response);
        return ResponseEntity.ok(response);
    }


    public ResponseEntity viewOrdersBy(String name) throws Exception {

//        System.out.println(name);

        User searchedUser = userRepository.findByFirstName(name).orElseThrow(()-> new Exception("User Not Found Exception"));

    //        System.out.println(searchedUser.getId());
            Optional<List<Product>> foundProducts = productRepository.findByOrderedBy(searchedUser.getId());

    //            System.out.println(foundProducts);
            List<Product> products = new ArrayList<>();
            if(foundProducts.isEmpty())
            {
                GlobalResponse response = new GlobalResponse("No Orders available", System.currentTimeMillis(),
                        202, products);
                return ResponseEntity.ok(response);
            }

            products = foundProducts.get();

            GlobalResponse response = new GlobalResponse("All Orders Placed Till Date", System.currentTimeMillis(),
                    202, products);

            return ResponseEntity.ok(response);

    }

    public ResponseEntity viewOrderById(int id) throws Exception
    {
        Product selectedProduct = productRepository.findById(id).orElseThrow(()-> new Exception("Order Does Not Exists"));
        List<Product> products = new ArrayList<>();
        products.add(selectedProduct);


        GlobalResponse res = new GlobalResponse("Order Details", System.currentTimeMillis(),
                200, products);

        return ResponseEntity.ok(res);
    }

    public ResponseEntity updateOrder(ProductUpdateDTO request) throws Exception {
        Product product = productRepository.findById(request.getId())
                .orElseThrow(() -> new Exception("Order Not Found"));


        if (!Objects.equals(product.getProductName(), request.getProductName())) {
            product.setProductName(request.getProductName());
        }

        if (!Objects.equals(product.getRequestedQuantity(), request.getRequestedQuantity())) {
            product.setRequestedQuantity(request.getRequestedQuantity());
        }

        if (!Objects.equals(product.getFinalizedQuantity(), request.getFinalizedQuantity())) {
            product.setFinalizedQuantity(request.getFinalizedQuantity());
        }

        if (product.getOrderedBy() != request.getOrderedBy()) {
            product.setOrderedBy(request.getOrderedBy());
        }

        if (!Objects.equals(product.getStatus(), request.getStatus())) {
            product.setStatus(request.getStatus());
        }

        if (!Objects.equals(product.getStoreRemarks(), request.getStoreRemarks())) {
            product.setStoreRemarks(request.getStoreRemarks());
        }

        if (!Objects.equals(product.getCustomerRemarks(), request.getCustomerRemarks())) {
            product.setCustomerRemarks(request.getCustomerRemarks());
        }

        if (!Objects.equals(product.getPurchaserRemarks(), request.getPurchaserRemarks())) {
            product.setPurchaserRemarks(request.getPurchaserRemarks());
        }

        if (!Objects.equals(product.getDirectorRemarks(), request.getDirectorRemarks())) {
            product.setDirectorRemarks(request.getDirectorRemarks());
        }

        if (!Objects.equals(product.getProjectName(), request.getProjectName())) {
            product.setProjectName(request.getProjectName());
        }

        if (product.getLastModifiedBy() != request.getLastModifiedBy()) {
            product.setLastModifiedBy(request.getLastModifiedBy());
        }

        if (!Objects.equals(product.getOrderDate(), request.getOrderDate())) {
            product.setOrderDate(request.getOrderDate());
        }

        if (!Objects.equals(product.getCustomerName(), request.getCustomerName())) {
            product.setCustomerName(request.getCustomerName());
        }

        if (request.getQuotations() != null && !request.getQuotations().isEmpty()) {
            product.setQuotations(request.getQuotations().getBytes());
        }

        productRepository.save(product);

        GlobalResponse res = new GlobalResponse("Order Details Updated", System.currentTimeMillis(),
                200);

        return ResponseEntity.ok(res);
    }

}
