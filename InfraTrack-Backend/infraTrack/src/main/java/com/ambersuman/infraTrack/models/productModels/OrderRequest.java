package com.ambersuman.infraTrack.models.productModels;

public class OrderRequest {

    private String productName = "";
    private String productQuantity = "";
    private String projectName = "";
    private int orderedBy = 0;
    private String engineerComments = "";
    private String orderDate;

    public OrderRequest(){}

    public OrderRequest(String productName, String productQuantity, int orderedBy, String projectName, String orderDate) {
        this.productName = productName;
        this.productQuantity = productQuantity;
        this.projectName = projectName;
        this.orderedBy = orderedBy;
        this.orderDate = orderDate;
    }

    public OrderRequest(String productName, String productQuantity, int orderedBy, String projectName, String orderDate, String engineerComments) {
        this.productName = productName;
        this.productQuantity = productQuantity;
        this.projectName = projectName;
        this.orderedBy = orderedBy;
        this.engineerComments = engineerComments;
        this.orderDate = orderDate;
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

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public int getOrderedBy() {
        return orderedBy;
    }

    public void setOrderedBy(int orderedBy) {
        this.orderedBy = orderedBy;
    }

    public String getEngineerComments() {
        return engineerComments;
    }

    public void setEngineerComments(String engineerComments) {
        this.engineerComments = engineerComments;
    }

    public String getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }
}
