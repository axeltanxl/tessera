package com.example.app.models;

import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import java.util.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
public class Seat {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long seatID;

  private String category;
  private String section;
  @Column(name = "seatRow")
  private String row;
  private int seatNo;
  
  @JsonBackReference(value="venue-seats")
  @ManyToOne
  @JoinColumn(name="venueID")
  private Venue venue;

  @JsonManagedReference(value="ticket-seats")
  @OneToMany(mappedBy = "seat")
  private List<Ticket> tickets;

  @JsonManagedReference(value="seat-runSeat")
  @OneToMany(mappedBy = "seat")
  private List<RunSeat> runs;

  public long getSeatID() {
    return seatID;
  }

  public void setSeatID(long seatID) {
    this.seatID = seatID;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public String getSection() {
    return section;
  }

  public void setSection(String section) {
    this.section = section;
  }

  public String getRow() {
    return row;
  }

  public void setRow(String row) {
    this.row = row;
  }

  public int getSeatNo() {
    return seatNo;
  }

  public void setSeatNo(int seatNo) {
    this.seatNo = seatNo;
  }

  public Venue getVenue() {
    return venue;
  }

  public void setVenue(Venue venue) {
    this.venue = venue;
  }

  public List<Ticket> getTickets() {
    return tickets;
  }

  public void setTickets(List<Ticket> tickets) {
    this.tickets = tickets;
  }

  public List<Run> getRuns() {
    return runs;
  }

  public void setRuns(List<Run> runs) {
    this.runs = runs;
  }
}