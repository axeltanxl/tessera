package com.example.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.app.models.Run;

public interface RunRepository extends JpaRepository<Run, Long>{
    List<Run> findAllByEventEventID(Long eventID);
    List<Run> findRunByOrderOrderID(long orderID);
}
