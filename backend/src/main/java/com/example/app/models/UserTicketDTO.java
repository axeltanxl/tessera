package com.example.app.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserTicketDTO {

    // private Long ticketID;
    private Seat seat;
    private Event event;
    private Run run;
    private Venue venue;
}
