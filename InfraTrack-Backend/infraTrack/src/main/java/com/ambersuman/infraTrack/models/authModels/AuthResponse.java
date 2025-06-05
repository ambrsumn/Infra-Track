package com.ambersuman.infraTrack.models.authModels;

public class AuthResponse {
    private boolean success;
    private Object userDetails;
    private String token;
    private String message;


    public AuthResponse() {}

    public AuthResponse(String token, String message, boolean success) {
        this.token = token;
        this.message = message;
        this.success = success;
    }

    public AuthResponse(String token, String message, boolean success, Object userObject) {
        this.token = token;
        this.message = message;
        this.success = success;
        this.userDetails = userObject;
    }

    public Object getUserDetails() {
        return userDetails;
    }

    public void setUserDetails(Object userDetails) {
        this.userDetails = userDetails;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
