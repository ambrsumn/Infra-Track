package com.ambersuman.infraTrack.repository;

import com.ambersuman.infraTrack.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Integer> {

//    @Query(value = "SELECT * FROM customer_orders WHERE ordered_by = :id", nativeQuery = true)
//    Optional<List<Product>> findByOrderedBy(@Param("id") int id);

    Optional<List<Product>> findByOrderedBy( int id);


}
