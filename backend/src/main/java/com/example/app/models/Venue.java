package com.example.app.models;

import java.util.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
public class Venue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long venueID;

    private String name;
    private int capacity;

    @JsonManagedReference(value="venue-seats")
    @OneToMany(mappedBy = "venue")
    private List<Seat> seats;

    @JsonManagedReference(value="venue-event")
    @OneToMany(mappedBy = "venue")
    private List<Event> events;

    public Venue() {
    }

    public Venue(String name, int capacity) {
        this.name = name;
        this.capacity = capacity;
    }

    public long getVenueID() {
      return venueID;
    }

    public void setVenueID(long venueID) {
      this.venueID = venueID;
    }

    public String getName() {
      return name;
    }

    public void setName(String name) {
      this.name = name;
    }

    public int getCapacity() {
      return capacity;
    }

    public void setCapacity(int capacity) {
      this.capacity = capacity;
    }

    public List<Seat> getSeats() {
      return seats;
    }

    public void setSeats(List<Seat> seats) {
      this.seats = seats;
    }

    public List<Event> getEvents() {
      return events;
    }

    public void setEvents(List<Event> events) {
      this.events = events;
    }
}