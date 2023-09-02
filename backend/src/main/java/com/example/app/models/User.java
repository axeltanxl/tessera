package com.example.app.models;

import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

import java.util.*;
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
    private int contactNum;
    private String address;

    @OneToMany(mappedBy = "user")
    private List<Order> orders;

    @OneToMany(mappedBy = "buyer")
    private List<Transaction> buyerTransactions;

    @OneToMany(mappedBy = "seller")
    private List<Transaction> sellerTransactions;

    public User() {
    }

    public User(String name, String email, String password, int contactNum, String address) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.contactNum = contactNum;
        this.address = address;
    }

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

    public List<Order> getOrders() {
      return orders;
    }

    public void setOrders(List<Order> orders) {
      this.orders = orders;
    }

    public List<Transaction> getBuyerTransactions() {
      return buyerTransactions;
    }

    public void setBuyerTransactions(List<Transaction> buyerTransactions) {
      this.buyerTransactions = buyerTransactions;
    }

    public List<Transaction> getSellerTransactions() {
      return sellerTransactions;
    }

    public void setSellerTransactions(List<Transaction> sellerTransactions) {
      this.sellerTransactions = sellerTransactions;
    }
}
