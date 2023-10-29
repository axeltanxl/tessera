package com.example.app.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.app.models.RunSeat;
import com.example.app.models.RunSeatDTO;
import com.example.app.models.Seat;
import com.example.app.repositories.RunSeatRepository;
import com.example.app.repositories.SeatRepository;

@Service
public class RunSeatService {
  @Autowired
    private RunSeatRepository runSeatRepo;

    public RunSeatService(RunSeatRepository runSeatRepository) {
        this.runSeatRepo = runSeatRepository;
    }
}
