package com.example.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.app.models.Seat;

public interface SeatRepository extends JpaRepository<Seat, Long>{
    List<Seat> findAllBySeatID(long seatID);

    List<Seat> findAllBySectionAndCategory(String category, String section);
}
