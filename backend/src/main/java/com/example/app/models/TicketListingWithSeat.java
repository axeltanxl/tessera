package com.example.app.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TicketListingWithSeat {
    private TicketListing ticketListing;
    private Seat seat;
}
