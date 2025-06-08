package com.ambersuman.infraTrack.entities;

import jakarta.persistence.*;

@Entity
@Table(name="customer_orders")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="order_id")
    private int id;

    @Column(name="product_name")
    private String productName;

    @Column(name="requested_Quantity")
    private String requestedQuantity;

    @Column(name="finalized_quantity")
    private String finalizedQuantity;

    @Column(name="ordered_by")
    private int orderedBy;

    @Column(name="status")
    private String status;

    @Column(name="store_remarks")
    private String storeRemarks;

    @Column(name="customer_remarks")
    private String customerRemarks;

    @Column(name="purchaser_remarks")
    private String purchaserRemarks;

    @Column(name="director_remarks")
    private String directorRemarks;

    @Column(name="project_name")
    private String projectName;

    @Column(name="last_modified_by")
    private int lastModifiedBy;

    @Column(name="order_date")
    private String orderDate;

    @Column(name="customer_name")
    private String customerName;

    @Column(name="process_tracking")
    private String tracker;

    @Lob
    @Column(name="quotations")
    private byte[] quotations;

    public Product() {}

    public Product(String productName, String requestedQuantity, int orderedBy, String projectName, String orderDate, String customerName) {
        this.productName = productName;
        this.requestedQuantity = requestedQuantity;
        this.orderedBy = orderedBy;
        this.projectName = projectName;
        this.customerName = customerName;
        this.orderDate = orderDate;
    }

    public Product(String productName, String requestedQuantity, int orderedBy, String projectName, String orderDate, String customerRemarks, String customerName) {
        this.productName = productName;
        this.requestedQuantity = requestedQuantity;
        this.orderedBy = orderedBy;
        this.projectName = projectName;
        this.customerName = customerName;
        this.customerRemarks = customerRemarks;
        this.orderDate = orderDate;
    }

    public String getTracker() {
        return tracker;
    }

    public void setTracker(String tracker) {
        this.tracker = tracker;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }

    public int getLastModifiedBy() {
        return lastModifiedBy;
    }

    public void setLastModifiedBy(int lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
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

    public String getRequestedQuantity() {
        return requestedQuantity;
    }

    public void setRequestedQuantity(String requestedQuantity) {
        this.requestedQuantity = requestedQuantity;
    }

    public String getFinalizedQuantity() {
        return finalizedQuantity;
    }

    public void setFinalizedQuantity(String finalizedQuantity) {
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

    public byte[] getQuotations() {
        return quotations;
    }

    public void setQuotations(byte[] quotations) {
        this.quotations = quotations;
    }
}
