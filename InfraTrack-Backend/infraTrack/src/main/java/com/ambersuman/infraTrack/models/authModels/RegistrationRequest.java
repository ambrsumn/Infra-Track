package com.ambersuman.infraTrack.models.authModels;

import org.springframework.web.multipart.MultipartFile;

public class RegistrationRequest {

    String firstName;
    String lastName;
    String email;
    String phone;
    String roleName;
    String securityCode;
    String accountPassword;
    String companyName;
    MultipartFile profileImage = null;
//    MultipartFile

    public RegistrationRequest(){}

    public RegistrationRequest(String firstName, String accountPassword, String securityCode, String roleName, String phone, String email, String lastName, String companyName, MultipartFile profileImage) {
        this.firstName = firstName;
        this.accountPassword = accountPassword;
        this.securityCode = securityCode;
        this.roleName = roleName;
        this.phone = phone;
        this.email = email;
        this.lastName = lastName;
        this.profileImage = profileImage;
        this.companyName = companyName;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public MultipartFile getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(MultipartFile profileImage) {
        this.profileImage = profileImage;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getAccountPassword() {
        return accountPassword;
    }

    public void setAccountPassword(String accountPassword) {
        this.accountPassword = accountPassword;
    }

    public String getSecurityCode() {
        return securityCode;
    }

    public void setSecurityCode(String securityCode) {
        this.securityCode = securityCode;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
