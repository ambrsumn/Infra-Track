package com.ambersuman.infraTrack.models;

public class UserDetailsResponse {

    private String firstName;
    private String lastName;
    private String email;
    private String roleName;
    private String companyName;
    private int userId;
    private byte[] profileImage;
    private String phone;

    public UserDetailsResponse(){}

    public UserDetailsResponse(String firstName, int userId, String email, String roleName, String lastName, String companyName, String phone) {
        this.firstName = firstName;
        this.userId = userId;
        this.email = email;
        this.roleName = roleName;
        this.lastName = lastName;
        this.companyName = companyName;
        this.phone = phone;
    }

    public UserDetailsResponse(String firstName, int userId, String email, String roleName, String lastName, String companyName, String phone, byte[] profileImage) {
        this.firstName = firstName;
        this.userId = userId;
        this.email = email;
        this.roleName = roleName;
        this.lastName = lastName;
        this.profileImage = profileImage;
        this.companyName = companyName;
        this.phone = phone;

    }

    public byte[] getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(byte[] profileImage) {
        this.profileImage = profileImage;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
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

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
