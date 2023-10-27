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
public class RunSeat {
  @Id
  private long runSeatID;
  private boolean isAvailable;

  @JsonBackReference(value="run-runSeat")
  @ManyToOne
  @JoinColumn(name = "runID")
  private Run run;

  @JsonBackReference(value="seat-runSeat")
  @OneToOne
  @JoinColumn(name="seatID")
  private Seat seat;
}
