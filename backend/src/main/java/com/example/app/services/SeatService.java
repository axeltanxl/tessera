package com.example.app.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.app.configs.SeatNotFoundException;
import com.example.app.models.RunSeat;
import com.example.app.models.RunSeatDTO;
import com.example.app.models.Seat;
import com.example.app.repositories.RunSeatRepository;
import com.example.app.repositories.SeatRepository;

@Service
public class SeatService {
    
    @Autowired
    private SeatRepository seatRepo;
    @Autowired
    private RunSeatRepository runSeatRepo;

    public SeatService(SeatRepository seatRepository) {
        this.seatRepo = seatRepository;
    }

    public List<RunSeatDTO> getAllSeatIDs(String CAT, String section, Long runID) {

        List<Seat> seatRepoList = seatRepo.findAllBySectionAndCategory(CAT, section);

        List<RunSeat> runSeats = runSeatRepo.findAll(); // Retrieve the RunSeats from the database
        List<RunSeatDTO> seatWithRunList = new ArrayList<>();

        for (Seat seat : seatRepoList) {
            for (RunSeat runSeat : runSeats) {
                if (runSeat.getSeat().getSeatID() == seat.getSeatID() && 
                    runSeat.getRun().getRunID() == runID) {
                    Long getRunID = runSeat.getRun().getRunID();
                    Long seatID = runSeat.getSeat().getSeatID();

                    // Create a RunSeatDTO instance and populate it
                    RunSeatDTO runSeatDTO = new RunSeatDTO();
                    runSeatDTO.setRunSeatID(runSeat.getRunSeatID());
                    runSeatDTO.setIsAvailable(runSeat.getIsAvailable());
                    runSeatDTO.setRunID(getRunID);
                    runSeatDTO.setSeatID(seatID);

                    seatWithRunList.add(runSeatDTO);
                }
            }
        }
        return seatWithRunList;
    }

    public Seat getSeat(Long seatID) {
      Optional<Seat> seat = seatRepo.findById(seatID);

      if (seat.isPresent()){
        return seat.get();
      } else {
        throw new SeatNotFoundException("Seat with ID " + seatID + " not found");
      }
    }
}