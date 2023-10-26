package com.example.app.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RunSeatDTO {
    // private Seat seat;
    // private Run run;
    // private RunSeat runSeat;
    private Long runSeatID;
    private boolean isAvailable;
    private Long runID;
    private Long seatID;
}
