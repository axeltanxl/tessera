package com.example.app.models;

import java.util.*;
import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class CustOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long orderID;

    private String ticketCategory;
    private int ticketQuantity;
    private Date date;
    private String stripeOrderID;

    @JsonBackReference(value="user-order")
    @ManyToOne
    @JoinColumn(name = "userID")
    private User user;

    @JsonBackReference(value="order-run")
    @ManyToOne
    @JoinColumn(name = "runID")
    private Run run;
    
    @JsonManagedReference(value="order-payment")
    @OneToMany(mappedBy = "order")
    private List<Payment> payments;

    @JsonManagedReference(value="order-ticket")
    @OneToMany(mappedBy = "order")
    private List<Ticket> tickets;
    
    public CustOrder() {
    }

    public CustOrder(String ticketCategory) {
        this.ticketCategory = ticketCategory;
    }

    public int getTicketQuantity() {
      return ticketQuantity;
    }

    public void setTicketQuantity(int ticketQuantity) {
      this.ticketQuantity = ticketQuantity;
    }

    public List<Payment> getPayments() {
      return payments;
    }

    public void setPayments(List<Payment> payments) {
      this.payments = payments;
    }

    public List<Ticket> getTickets() {
      return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
      this.tickets = tickets;
    }

    public long getOrderID() {
        return orderID;
    }

    public void setOrderID(long orderID) {
        this.orderID = orderID;
    }

    public String getTicketCategory() {
        return ticketCategory;
    }

    public void setTicketCategory(String ticketCategory) {
        this.ticketCategory = ticketCategory;
    }

    //Users r/s
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getDate() {
      return date;
    }

    public void setDate(Date date) {
      this.date = date;
    }

    public Run getRun() {
      return run;
    }

    public void setRun(Run run) {
      this.run = run;
    }

    public String getStripeOrderID() {
      return stripeOrderID;
    }

    public void setStripeOrderID(String stripeOrderID) {
      this.stripeOrderID = stripeOrderID;
    }
}