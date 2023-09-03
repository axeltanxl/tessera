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
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long ticketId;

    private String uniqueCode;
    
    @ManyToOne
    @JoinColumn(name="orderId")
    private Order order;

    @ManyToOne
    @JoinColumn(name="seatId")
    private Seat seat;

    @OneToMany(mappedBy = "ticket")
    private List<Transaction> transactions;

    public long getTicketId() {
      return ticketId;
    }

    public void setTicketId(long ticketId) {
      this.ticketId = ticketId;
    }

    public String getUniqueCode() {
      return uniqueCode;
    }

    public void setUniqueCode(String uniqueCode) {
      this.uniqueCode = uniqueCode;
    }

    public Order getOrder() {
      return order;
    }

    public void setOrder(Order order) {
      this.order = order;
    }

    public Seat getSeat() {
      return seat;
    }

    public void setSeat(Seat seat) {
      this.seat = seat;
    }

    public List<Transaction> getTransactions() {
      return transactions;
    }

    public void setTransactions(List<Transaction> transactions) {
      this.transactions = transactions;
    }
}