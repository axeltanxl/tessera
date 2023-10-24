package com.example.app.models; 
 
import jakarta.persistence.Id; 
import jakarta.persistence.JoinColumn; 
import jakarta.persistence.ManyToOne; 
import jakarta.persistence.OneToMany; 
 
import java.util.*; 
 
import com.fasterxml.jackson.annotation.JsonBackReference; 
import com.fasterxml.jackson.annotation.JsonManagedReference; 
 
import jakarta.persistence.Entity; 
import jakarta.persistence.GeneratedValue; 
import jakarta.persistence.GenerationType; 
 
@Entity 
public class Ticket { 
  @Id 
  @GeneratedValue(strategy = GenerationType.IDENTITY) 
  private long ticketID; 
  private String uniqueCode; 
 
  @JsonBackReference(value = "order-ticket") 
  @ManyToOne 
  @JoinColumn(name = "orderID") 
  private CustOrder order; 
 
  @JsonBackReference(value = "ticket-seats") 
  @ManyToOne 
  @JoinColumn(name = "seatID") 
  private Seat seat; 
 
  @JsonManagedReference(value = "transaction-ticket") 
  @OneToMany(mappedBy = "ticket") 
  private List<Transaction> transactions; 
 
  @JsonManagedReference(value = "ticketListing-ticket") 
  @OneToMany(mappedBy = "ticket") 
  private List<TicketListing> ticketListings; 
 
  @JsonBackReference(value = "ticket-user") 
  @ManyToOne 
  @JoinColumn(name = "userID") 
  private User user; 
 
  public long getTicketID() { 
    return ticketID; 
  } 
 
  public void setTicketID(long ticketID) { 
    this.ticketID = ticketID; 
  } 
 
  public List<TicketListing> getTicketListings() { 
    return ticketListings; 
  } 
 
  public void setTicketListings(List<TicketListing> ticketListings) { 
    this.ticketListings = ticketListings; 
  } 
 
  public String getUniqueCode() { 
    return uniqueCode; 
  } 
 
  public void setUniqueCode(String uniqueCode) { 
    this.uniqueCode = uniqueCode; 
  } 
 
  public CustOrder getOrder() { 
    return order; 
  } 
 
  public void setOrder(CustOrder order) { 
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
 
  public User getUser() { 
    return user; 
  } 
 
  public void setUser(User user) { 
    this.user = user; 
  } 
}