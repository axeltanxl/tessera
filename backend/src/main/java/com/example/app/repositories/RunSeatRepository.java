package com.example.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.app.models.RunSeat;

@Repository
public interface RunSeatRepository extends JpaRepository<RunSeat, Long>{
    List<RunSeat> findAllBySeatSeatID(Long SeatID);
    RunSeat findBySeatSeatIDAndRunRunID(Long seatID, Long runID);
}