package com.example.app.models;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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

    private String startTime;
    private String endTime;
    private Date date;

    @JsonManagedReference(value="run-ticketlisting")
    @OneToMany(mappedBy = "run")
    private List<TicketListing> ticketListing;
}
