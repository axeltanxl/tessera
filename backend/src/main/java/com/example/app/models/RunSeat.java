package com.example.app.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class RunSeat {
  @Id
  private long runSeatID;
  private int isAvailable;

  @JsonBackReference(value="run-runSeat")
  @ManyToOne
  @JoinColumn(name = "runID")
  private Run run;

  @JsonBackReference(value="seat-runSeat")
  @ManyToOne
  @JoinColumn(name="seatID")
  private Seat seat;
}
