package com.example.app.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long paymentID;

    private String paymentMethod;
    private int isSuccessful;

    @ManyToOne
    @JoinColumn(name = "orderId")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "transactionId")
    private Transaction transaction;

    public Payment() {
    }

    public Payment(String paymentMethod, int isSuccessful) {
        this.paymentMethod = paymentMethod;
        this.isSuccessful = isSuccessful;
    }

    public long getPaymentID() {
        return paymentID;
    }

    public void setPaymentID(long paymentID) {
        this.paymentID = paymentID;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public int getIsSuccessful() {
        return isSuccessful;
    }

    public void setIsSuccessful(int isSuccessful) {
        this.isSuccessful = isSuccessful;
    }

    public Order getOrder() {
      return order;
    }

    public void setOrder(Order order) {
      this.order = order;
    }
}
