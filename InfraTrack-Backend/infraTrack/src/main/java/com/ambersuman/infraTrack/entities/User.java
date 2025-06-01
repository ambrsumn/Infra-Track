package com.ambersuman.infraTrack.entities;

import jakarta.persistence.*;
import org.springframework.web.multipart.MultipartFile;

@Entity
@Table(name="user_table")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private int id;

    @Column(name = "first_name", nullable = false, unique = true)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "role_name", nullable = false)
    private String roleName;

    @Column(name = "security_code")
    private String securityCode;

    @Column(name = "account_password", nullable = false)
    private String accountPassword;

    @Column(name = "company_name", nullable = false)
    private String companyName;

    @Lob
    @Column(name = "profile_image")
    private byte[] profileImage;

    public User(){}

    public User(String firstName, String lastName, String email, String phone, String roleName, String securityCode, String accountPassword, String companyName, byte[] profileImage) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.roleName = roleName;
        this.securityCode = securityCode;
        this.accountPassword = accountPassword;
        this.profileImage = profileImage;
        this.companyName = companyName;
    }

    public User(String firstName, String lastName, String email, String phone, String roleName, String securityCode, String accountPassword, String companyName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.roleName = roleName;
        this.securityCode = securityCode;
        this.accountPassword = accountPassword;
        this.companyName = companyName;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
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

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getSecurityCode() {
        return securityCode;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setSecurityCode(String securityCode) {
        this.securityCode = securityCode;
    }

    public String getAccountPassword() {
        return accountPassword;
    }

    public void setAccountPassword(String accountPassword) {
        this.accountPassword = accountPassword;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", roleName='" + roleName + '\'' +
                ", securityCode='" + securityCode + '\'' +
                ", accountPassword='" + accountPassword + '\'' +
                '}';
    }
}
