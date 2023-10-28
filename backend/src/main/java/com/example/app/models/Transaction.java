package com.example.app.models;

import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

import java.util.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
public class Transaction {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long transactionID;

  private Date date;

  @JsonBackReference(value = "transaction-ticket")
  @ManyToOne
  @JoinColumn(name = "ticketID")
  private Ticket ticket;

  @JsonBackReference(value = "user-buyer")
  @ManyToOne
  @JoinColumn(name = "buyerID")
  private User buyer;

  @JsonBackReference(value = "user-seller")
  @ManyToOne
  @JoinColumn(name = "sellerID")
  private User seller;

  @JsonManagedReference(value = "transaction-payment")
  @OneToMany(mappedBy = "transaction")
  private List<Payment> payments;

  @OneToOne(mappedBy = "transaction")
  private TicketListing ticketListing;

  public long getTransactionID() {
    return transactionID;
  }

  public void setTransactionID(long transactionID) {
    this.transactionID = transactionID;
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