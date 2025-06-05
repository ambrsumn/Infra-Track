package com.ambersuman.infraTrack.services;

import com.ambersuman.infraTrack.entities.Product;
import com.ambersuman.infraTrack.entities.User;
import com.ambersuman.infraTrack.models.GlobalResponse;
import com.ambersuman.infraTrack.repository.ProductRepository;
import com.ambersuman.infraTrack.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
        List<Product> allOrders = new ArrayList<>();
        allOrders = productRepository.findAll();

        if(allOrders.isEmpty())
        {
            GlobalResponse response = new GlobalResponse("Something went wrong, please check later", System.currentTimeMillis(), 500);
            return ResponseEntity.internalServerError().body(response);
        }
        return ResponseEntity.ok(allOrders);
    }


    public ResponseEntity viewOrdersBy(String name) {

//        System.out.println(name);

        Optional<User> searchedUser = userRepository.findByFirstName(name);

        if(searchedUser.isEmpty())
        {
            GlobalResponse response = new GlobalResponse("No User Found With This First Name", System.currentTimeMillis(), 202);
            return ResponseEntity.ok(response);
        }
        else
        {
            User foundUser = searchedUser.get();
//            System.out.println(foundUser.getId());

            Optional<List<Product>> foundProducts = productRepository.findByOrderedBy(foundUser.getId());

//            System.out.println(foundProducts);
            if(foundProducts.isEmpty())
            {
                GlobalResponse response = new GlobalResponse("No Orders available", System.currentTimeMillis(), 202);
                return ResponseEntity.ok(response);
            }

            List<Product> products = foundProducts.get();
            return ResponseEntity.ok(products);
        }
    }
}
