package com.example.app.models;

import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import org.apache.tomcat.jni.Library;

import java.util.*;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
public class Seat {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long seatId;

  private String category;
  private String section;
  private String row;
  private int seatNo;
  
  @ManyToOne
  @JoinColumn(name="venueId")
  private Venue venue;

  @OneToMany(mappedBy = "seat")
  private List<Ticket> tickets;

  public long getSeatId() {
    return seatId;
  }

  public void setSeatId(long seatId) {
    this.seatId = seatId;
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
}