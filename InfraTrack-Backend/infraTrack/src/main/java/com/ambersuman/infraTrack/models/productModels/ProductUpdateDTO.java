package com.ambersuman.infraTrack.models.productModels;


import org.springframework.web.multipart.MultipartFile;

public class ProductUpdateDTO {

    private int id;
    private String productName;
    private String requestedQuantity;
    private Integer finalizedQuantity;
    private int orderedBy;
    private String status;
    private String storeRemarks;
    private String customerRemarks;
    private String purchaserRemarks;
    private String directorRemarks;
    private String projectName;
    private int lastModifiedBy;
    private String orderDate;
    private String customerName;
    private MultipartFile quotations = null;

    public ProductUpdateDTO() {}

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

    public String getRequestedQuantity() {
        return requestedQuantity;
    }

    public void setRequestedQuantity(String requestedQuantity) {
        this.requestedQuantity = requestedQuantity;
    }

    public Integer getFinalizedQuantity() {
        return finalizedQuantity;
    }

    public void setFinalizedQuantity(Integer finalizedQuantity) {
        this.finalizedQuantity = finalizedQuantity;
    }

    public int getOrderedBy() {
        return orderedBy;
    }

    public void setOrderedBy(int orderedBy) {
        this.orderedBy = orderedBy;
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

    public String getCustomerRemarks() {
        return customerRemarks;
    }

    public void setCustomerRemarks(String customerRemarks) {
        this.customerRemarks = customerRemarks;
    }

    public String getPurchaserRemarks() {
        return purchaserRemarks;
    }

    public void setPurchaserRemarks(String purchaserRemarks) {
        this.purchaserRemarks = purchaserRemarks;
    }

    public String getDirectorRemarks() {
        return directorRemarks;
    }

    public void setDirectorRemarks(String directorRemarks) {
        this.directorRemarks = directorRemarks;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public int getLastModifiedBy() {
        return lastModifiedBy;
    }

    public void setLastModifiedBy(int lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public String getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public MultipartFile getQuotations() {
        return quotations;
    }

    public void setQuotations(MultipartFile quotations) {
        this.quotations = quotations;
    }
}
