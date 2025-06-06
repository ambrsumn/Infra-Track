package com.ambersuman.infraTrack.models.authModels;

public class PasswordChangeRequest {

    private String email;
    private String securityCode;
    private String password;

    public PasswordChangeRequest(){}

    public PasswordChangeRequest(String email, String securityCode, String password) {
        this.email = email;
        this.securityCode = securityCode;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSecurityCode() {
        return securityCode;
    }

    public void setSecurityCode(String securityCode) {
        this.securityCode = securityCode;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
