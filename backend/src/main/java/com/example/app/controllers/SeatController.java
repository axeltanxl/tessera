package com.example.app.controllers;

import java.util.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.models.RunSeatDTO;
import com.example.app.services.SeatService;

import com.example.app.models.RunSeat;
import com.example.app.models.Seat;
import com.example.app.models.SeatAlgoDTO;
import com.example.app.repositories.RunSeatRepository;

@RestController
@RequestMapping("/api/v1")
public class SeatController {
    
    private final SeatService seatService;

    private final RunSeatRepository runSeatRepo;

    public SeatController(SeatService seatService, RunSeatRepository runSeatRepo) {
        this.seatService = seatService;
        this.runSeatRepo = runSeatRepo;
    }

    @PostMapping("/runs/{runID}/seatAllocation")
    public ResponseEntity<Object> getSeats (@RequestBody SeatAlgoDTO reqBody, @PathVariable("runID") Long runID){
      List<RunSeatDTO> seatLists = seatService.getAllSeatIDs(reqBody.getSection(), reqBody.getCategory(), runID);
      int quantity = reqBody.getQuantity();

      int numRows = (int) Math.ceil((double) seatLists.size() / 10);

      //create 2D array to represent seats
      RunSeatDTO[][] seatArray = new RunSeatDTO[numRows][10];
      for (int i = 0; i < numRows; i++){
        for (int j = 0; j < 10; j++){
          int index = j + i * 10;
          //set each element in the array as the RunSeatDTO object
          if (index < seatLists.size()){
            seatArray[i][j] = seatLists.get(index);
          } else {
            seatArray[i][j] = null;
          }
        }
      }

      //loop through array to find number of available seats
      int count = 0;
      // boolean isFound = false;
      List<RunSeatDTO> runSeats = new ArrayList<RunSeatDTO>();

      for (int i = 0; i < numRows; i++){
        count = 0;
        runSeats.clear();
        for (int j = 0; j < 10; j++){
          RunSeatDTO seat = seatArray[i][j];
          if (seat != null && seat.getIsAvailable() == 1){
            count++;
            runSeats.add(seat);
            if (count == quantity){
              break;
            }
          } else {
            count = 0;
            runSeats.clear();
          }
        }
        if (count == quantity){
          break;
        }
      }

      if (runSeats.size() < quantity) { //no seats available
        return ResponseEntity.status(HttpStatus.CONFLICT).body("Not enough seats available.");
      }

      List<Seat> result = new ArrayList<>();
      runSeats.forEach(runSeatDTO -> {
        Long runSeatID = runSeatDTO.getRunSeatID();
        Seat seat = seatService.getSeat(runSeatDTO.getSeatID());
        Optional<RunSeat> newRunSeat = runSeatRepo.findById(runSeatID);
        newRunSeat.get().setIsAvailable(2);
        runSeatRepo.save(newRunSeat.get());
        result.add(seat);
      });

      return ResponseEntity.ok(result);
    }
}
