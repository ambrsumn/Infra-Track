package com.ambersuman.infraTrack.models.productModels;

public class DirectorUpdateOrderDetails {

    private int id;
    private String status = "";
    private String directorRemarks = "";

    public DirectorUpdateOrderDetails(){}

    public DirectorUpdateOrderDetails(int id, String status, String directorRemarks) {
        this.id = id;
        this.status = status;
        this.directorRemarks = directorRemarks;
    }

    public DirectorUpdateOrderDetails(int id, String status) {
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

    public String getDirectorRemarks() {
        return directorRemarks;
    }

    public void setDirectorRemarks(String directorRemarks) {
        this.directorRemarks = directorRemarks;
    }
}
