package com.example.app.models;

import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;


import java.util.*;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long transactionId;

    private Date date;

    @ManyToOne
    @JoinColumn(name="ticketId")
    private Ticket ticket;

    @ManyToOne
    @JoinColumn(name = "buyerId")
    private User buyer;

    @ManyToOne
    @JoinColumn(name = "sellerId")
    private User seller;

    @OneToMany(mappedBy = "transaction")
    private List<Payment> payments;

    public long getTransactionId() {
      return transactionId;
    }

    public void setTransactionId(long transactionId) {
      this.transactionId = transactionId;
    }

    public Date getDate() {
      return date;
    }

    public void setDate(Date date) {
      this.date = date;
    }

    public Ticket getTicket() {
      return ticket;
    }

    public void setTicket(Ticket ticket) {
      this.ticket = ticket;
    }

    public User getBuyer() {
      return buyer;
    }

    public void setBuyer(User buyer) {
      this.buyer = buyer;
    }

    public User getSeller() {
      return seller;
    }

    public void setSeller(User seller) {
      this.seller = seller;
    }

    public List<Payment> getPayments() {
      return payments;
    }

    public void setPayments(List<Payment> payments) {
      this.payments = payments;
    }
}