package com.ambersuman.infraTrack.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "stocks")
public class Stocks {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="product_id")
    private int id;

    @Column(name = "product_name")
    private String productName;


    @Column(name = "product_quantity")
    private String productQuantity;

    public Stocks(){};

    public Stocks(int id, String productName, String productQuantity) {
        this.id = id;
        this.productName = productName;
        this.productQuantity = productQuantity;
    }

    public Stocks(String productName, String productQuantity) {
        this.productName = productName;
        this.productQuantity = productQuantity;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getProductQuantity() {
        return productQuantity;
    }

    public void setProductQuantity(String productQuantity) {
        this.productQuantity = productQuantity;
    }
}
