package com.example.app.models;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Run {
    //Primary Key
    @Id
    private long runID;

    @JsonBackReference(value="event-run")
    @ManyToOne
    @JoinColumn(name = "eventID")
    private Event event;
    private Date date;

    @JsonBackReference
    @OneToOne(mappedBy = "run")
    private TicketListing ticketListing;
}
