package com.example.app.models;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TicketDTO {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Long ticketID;

    @OneToOne
    private Seat seat;
    @OneToOne
    private Event event;
    @OneToOne
    private Run run;

}
