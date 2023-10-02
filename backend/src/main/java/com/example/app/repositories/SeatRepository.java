package com.example.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.app.models.Seat;

public interface SeatRepository extends JpaRepository<Seat, Long>{
}
