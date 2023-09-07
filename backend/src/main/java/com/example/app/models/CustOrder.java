package com.example.app.models;

import java.util.*;
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

    private int price;
    private int ticketQuantity;

    @ManyToOne
    @JoinColumn(name = "userID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "eventID")
    private Event event;

    @OneToMany(mappedBy = "order")
    private List<Payment> payments;

    @OneToMany(mappedBy = "order")
    private List<Ticket> tickets;
    
    public CustOrder() {
    }

    public CustOrder(int price) {
        this.price = price;
    }

    public int getTicketQuantity() {
      return ticketQuantity;
    }

    public void setTicketQuantity(int ticketQuantity) {
      this.ticketQuantity = ticketQuantity;
    }

    public Event getEvent() {
      return event;
    }

    public void setEvent(Event event) {
      this.event = event;
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
