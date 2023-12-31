package com.example.app.models;

import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
    private String startTime;
    private String endTime;
    private Date date;

    @JsonManagedReference(value="order-run")
    @OneToMany(mappedBy = "run")
    private List<CustOrder> orders;

    @JsonBackReference(value="event-run")
    @ManyToOne
    @JoinColumn(name = "eventID")
    private Event event;

    @JsonManagedReference(value="run-ticketlisting")
    @OneToMany(mappedBy = "run")
    private List<TicketListing> ticketListing;

    @JsonBackReference(value="marketplace-run")
    @OneToOne
    @JoinColumn(name="marketplaceID")
    private Marketplace marketplace;

    @JsonManagedReference(value="run-runSeat")
    @OneToMany(mappedBy = "run")
    private List<RunSeat> seats;
}
