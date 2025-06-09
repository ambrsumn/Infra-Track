package com.ambersuman.infraTrack.services;

import com.ambersuman.infraTrack.entities.Stocks;
import com.ambersuman.infraTrack.models.GlobalResponse;
import com.ambersuman.infraTrack.models.productModels.AddStocksRequest;
import com.ambersuman.infraTrack.repository.ProductRepository;
import com.ambersuman.infraTrack.repository.StocksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StoreService {

    private StocksRepository stocksRepository;
    private ProductRepository productRepository;

    public StoreService(){}

    @Autowired
    public StoreService(StocksRepository stocksRepository, ProductRepository productRepository){
        this.stocksRepository = stocksRepository;
        this.productRepository = productRepository;
    }

    public ResponseEntity addStocks(AddStocksRequest request) throws Exception {


//            System.out.println(request.getId() + " " + request.getProductName() + " " + request.getProductQuantity());
            Stocks newStock = new Stocks(request.getId(),
                    request.getProductName(), request.getProductQuantity());

            stocksRepository.save(newStock);

            GlobalResponse response = new GlobalResponse("Stock Saved To Database",
                    System.currentTimeMillis(), 200);
            return ResponseEntity.ok(response);
    }

    public ResponseEntity checkForProduct(String productName) {

        try
        {
            Optional<List<Stocks>> matchedStocks = this.stocksRepository.findMatchingProducts(productName);
            List<Stocks> stocks = new ArrayList();
            if(matchedStocks.isEmpty())
            {

                GlobalResponse response = new GlobalResponse("No Matching Stock",
                        System.currentTimeMillis(), HttpStatus.INTERNAL_SERVER_ERROR.value(), stocks);
                return ResponseEntity.internalServerError().body(response);
            }

            stocks = matchedStocks.get();

            GlobalResponse response = new GlobalResponse("Matching Products Available In Store",
                    System.currentTimeMillis(), HttpStatus.INTERNAL_SERVER_ERROR.value(), stocks);
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


    public ResponseEntity viewStocks() throws Exception{

        List<Stocks> allStcoks = stocksRepository.findAll();

        GlobalResponse res = new GlobalResponse("Available Stocks", System.currentTimeMillis(),
                200, allStcoks);

        return ResponseEntity.ok(res);

    }

    public ResponseEntity deleteStock(int id) throws Exception {

        stocksRepository.deleteById(id);
        GlobalResponse res = new GlobalResponse("Deleted Sucessfully", System.currentTimeMillis(), 200);
        return ResponseEntity.ok(res);
    }
}
