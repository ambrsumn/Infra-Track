package com.ambersuman.infraTrack.models;

import java.util.List;

public class GlobalResponse {

    private int status;
    private String message;
    private long timeStamp;
    private List data;

    public GlobalResponse(){}
    public GlobalResponse(String message, long timeStamp, int status) {
        this.message = message;
        this.timeStamp = timeStamp;
        this.status = status;
    }

    public GlobalResponse(String message, long timeStamp, int status, List data) {
        this.message = message;
        this.timeStamp = timeStamp;
        this.data = data;
        this.status = status;
    }

    public List getData() {
        return data;
    }

    public void setData(List data) {
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public long getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(long timeStamp) {
        this.timeStamp = timeStamp;
    }
}
