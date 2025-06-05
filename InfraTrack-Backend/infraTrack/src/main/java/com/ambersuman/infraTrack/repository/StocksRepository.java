package com.ambersuman.infraTrack.repository;


import com.ambersuman.infraTrack.entities.Stocks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StocksRepository extends JpaRepository<Stocks, Integer> {

    @Query(value = "select * from stocks where product_name like CONCAT('%', :productName, '%')", nativeQuery = true)
    Optional<List<Stocks>> findMatchingProducts(@Param("productName") String productName);
}
