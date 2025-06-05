package com.ambersuman.infraTrack.models.productModels;

public class StoreUpdateOrderDetails {

    private int id;
    private String status = "";
    private String storeRemarks = "";
    private Integer finalizedQuantity = 0;

    public StoreUpdateOrderDetails(){}

    public StoreUpdateOrderDetails(int id, String status, String storeRemarks, int finalizedQuantity) {
        this.id = id;
        this.status = status;
        this.storeRemarks = storeRemarks;
        this.finalizedQuantity = finalizedQuantity;
    }

    public StoreUpdateOrderDetails(int id, String status, int finalizedQuantity) {
        this.id = id;
        this.status = status;
        this.finalizedQuantity = finalizedQuantity;
    }

    public StoreUpdateOrderDetails(int id, String status) {
        this.id = id;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStoreRemarks() {
        return storeRemarks;
    }

    public void setStoreRemarks(String storeRemarks) {
        this.storeRemarks = storeRemarks;
    }

    public Integer getFinalizedQuantity() {
        return finalizedQuantity;
    }

    public void setFinalizedQuantity(Integer finalizedQuantity) {
        this.finalizedQuantity = finalizedQuantity;
    }
}
