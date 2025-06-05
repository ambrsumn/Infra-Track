package com.ambersuman.infraTrack.models.productModels;

public class OrderRequest {

    private String productName = "";
    private String productQuantity = "";
    private String projectName = "";
    private int orderedBy = 0;
    private String engineerComments = "";

    public OrderRequest(){}

    public OrderRequest(String productName, String productQuantity, int orderedBy, String projectName) {
        this.productName = productName;
        this.productQuantity = productQuantity;
        this.projectName = projectName;
        this.orderedBy = orderedBy;
    }

    public OrderRequest(String productName, String productQuantity, int orderedBy, String projectName, String engineerComments) {
        this.productName = productName;
        this.productQuantity = productQuantity;
        this.projectName = projectName;
        this.orderedBy = orderedBy;
        this.engineerComments = engineerComments;
    }

    public int getOrderedBy() {
        return orderedBy;
    }

    public void setOrderedBy(int orderedBy) {
        this.orderedBy = orderedBy;
    }

    public String getProductQuantity() {
        return productQuantity;
    }

    public void setProductQuantity(String productQuantity) {
        this.productQuantity = productQuantity;
    }

    public String getprojectName() {
        return projectName;
    }

    public void setprojectName(String projectName) {
        this.projectName = projectName;
    }

    public String getEngineerComments() {
        return engineerComments;
    }

    public void setEngineerComments(String engineerComments) {
        this.engineerComments = engineerComments;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }
}
