package com.example.app.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

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
    private String stripePaymentID;

    @JsonBackReference(value="order-payment")
    @ManyToOne
    @JoinColumn(name = "orderID")
    private CustOrder order;

    @JsonBackReference(value="transaction-payment")
    @ManyToOne
    @JoinColumn(name = "transactionID")
    private Transaction transaction;

    public Payment() {
    }

    public Payment(String paymentMethod, String stripePaymentID) {
        this.paymentMethod = paymentMethod;
        this.stripePaymentID = stripePaymentID;
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

    public CustOrder getOrder() {
      return order;
    }

    public void setOrder(CustOrder order) {
      this.order = order;
    }

    public Transaction getTransaction() {
      return transaction;
    }

    public void setTransaction(Transaction transaction) {
      this.transaction = transaction;
    }

    public String getStripePaymentID() {
      return stripePaymentID;
    }

    public void setStripePaymentID(String stripePaymentID) {
      this.stripePaymentID = stripePaymentID;
    }
}
