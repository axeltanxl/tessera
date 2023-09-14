package com.example.app.models;

import java.sql.Date;

import java.util.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import jakarta.persistence.ManyToOne;

@Entity
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long eventID;

    @NotNull(message = "Event name cannot be null")
    private String name;
    private String category;
    @Column(columnDefinition = "TEXT")
    private String description;
    private Date startDate;
    private Date endDate;
    private int duration;
    private String pricePerCategory;
    private int maxSlots;

    @OneToMany(mappedBy = "event")
    private List<CustOrder> orders;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "venueID")
    private Venue venue;

    public long getEventID() {
      return eventID;
    }

    @Override
    public String toString() {
      return "Event [eventID=" + eventID + ", name=" + name + ", category=" + category + ", description=" + description
          + ", startDate=" + startDate + ", endDate=" + endDate + ", duration=" + duration + ", pricePerCategory="
          + pricePerCategory + ", maxSlots=" + maxSlots + ", orders=" + orders + ", venue=" + venue + "]";
    }

    public void setEventID(long eventID) {
      this.eventID = eventID;
    }

    public String getCategory() {
      return category;
    }

    public void setCategory(String category) {
      this.category = category;
    }

    public String getDescription() {
      return description;
    }

    public void setDescription(String description) {
      this.description = description;
    }

    public Date getStartDate() {
      return startDate;
    }

    public void setStartDate(Date startDate) {
      this.startDate = startDate;
    }

    public Date getEndDate() {
      return endDate;
    }

    public void setEndDate(Date endDate) {
      this.endDate = endDate;
    }

    public int getDuration() {
      return duration;
    }

    public void setDuration(int duration) {
      this.duration = duration;
    }

    public String getPricePerCategory() {
      return pricePerCategory;
    }

    public void setPricePerCategory(String pricePerCategory) {
      this.pricePerCategory = pricePerCategory;
    }

    public int getMaxSlots() {
      return maxSlots;
    }

    public void setMaxSlots(int maxSlots) {
      this.maxSlots = maxSlots;
    }

    public List<CustOrder> getCustOrders() {
      return orders;
    }

    public void setCustOrders(List<CustOrder> orders) {
      this.orders = orders;
    }

    public Venue getVenue() {
      return venue;
    }

    public void setVenue(Venue venue) {
      this.venue = venue;
    }

    public String getName() {
      return name;
    }

    public void setName(String name) {
      this.name = name;
    }
}
