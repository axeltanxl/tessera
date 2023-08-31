package com.example.app.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
// import jakarta.persistence.PrimaryKeyJoinColumn;

@Entity
public class CustOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long orderID;

    private int price;

    @ManyToOne
    // @PrimaryKeyJoinColumn(name="userID", referencedColumnName="userID")
    @JoinColumn(name="userID")
    private User user;
    
    public CustOrder() {
    }

    public CustOrder(int price) {
        this.price = price;
    }

    public long getOrderID() {
        return orderID;
    }

    public void setOrderID(long orderID) {
        this.orderID = orderID;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    //Users r/s
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
    
}
