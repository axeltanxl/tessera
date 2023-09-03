package com.example.app.models;

import java.util.*;

import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
public class Venue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long venueId;

    private String name;
    private int capacity;

    @OneToMany(mappedBy = "venue")
    private List<Seat> seats;

    @OneToMany(mappedBy = "venue")
    private List<Event> events;

    public Venue() {
    }

    public Venue(String name, int capacity) {
        this.name = name;
        this.capacity = capacity;
    }

    public long getVenueId() {
      return venueId;
    }

    public void setVenueId(long venueId) {
      this.venueId = venueId;
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