package com.ambersuman.infraTrack.models.productModels;

public class AddStocksRequest {

    int id = 0;
    private String productName = "";
    private String productQuantity = "";

    public AddStocksRequest(){};

    public AddStocksRequest(int id, String productName, String productQuantity) {
        this.productName = productName;
        this.productQuantity = productQuantity;
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductQuantity() {
        return productQuantity;
    }

    public void setProductQuantity(String productQuantity) {
        this.productQuantity = productQuantity;
    }
}
