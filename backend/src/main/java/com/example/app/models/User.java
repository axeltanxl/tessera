package com.example.app.models;

import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity // This tells Hibernate to make a table out of this class
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userID;

    private String name;
    private String email;
    private String password;
    @Column(name = "contactNum")
    private int contactNum;

    private String address;

    // @OneToOne(targetEntity = Order.class)
    // private List<Order> orders;

    public User() {
    }

    public User(String name, String email, String password, int contactNum, String address) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.contactNum = contactNum;
        this.address = address;
    }

    // @Override
    // public String toString() {
    //     return String.format(
    //             "User[id=%d, name='%s', email='%s']",
    //             userID, name, email);
    // }

    public long getUserID() {
        return userID;
    }

    public void setUserID(long userID) {
        this.userID = userID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getContactNum() {
        return contactNum;
    }

    public void setContactNum(int contactNum) {
        this.contactNum = contactNum;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

}
