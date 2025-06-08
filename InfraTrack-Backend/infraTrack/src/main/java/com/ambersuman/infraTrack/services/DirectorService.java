package com.ambersuman.infraTrack.services;

import com.ambersuman.infraTrack.repository.ProductRepository;
import org.springframework.stereotype.Service;

@Service
public class DirectorService {

    private ProductRepository productRepository;

    public DirectorService(){}

    public DirectorService(ProductRepository productRepository)
    {
        this.productRepository = productRepository;
    }





}
