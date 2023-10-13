package com.example.app.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SeatDTO {
    private long seatID;
    private String category;
    private String section;
    private String row;
    private int seatNo;
    private long eventID;
}
