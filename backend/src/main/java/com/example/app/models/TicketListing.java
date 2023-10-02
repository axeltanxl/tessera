package com.example.app.models;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class TicketListing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long listingID;

    private Date listingDate;
    private double price;
    private int quantity;
    private String status;

    @JsonBackReference(value="ticketListing-user")
    @ManyToOne
    @JoinColumn(name = "userID")
    private User user;

    @JsonBackReference(value="ticketListing-ticket")
    @ManyToOne
    @JoinColumn(name = "ticketID")
    private Ticket ticket;

    @JsonBackReference(value="ticketListing-event")
    @ManyToOne
    @JoinColumn(name = "eventID")
    private Event event;

    @OneToOne
    @JoinColumn(name = "transactionID")
    private Transaction transaction;

    @JsonBackReference(value="run-ticketlisting")
    @OneToOne
    @JoinColumn(name = "runID")
    @JsonIgnoreProperties("ticketListing")
    private Run run;
}
