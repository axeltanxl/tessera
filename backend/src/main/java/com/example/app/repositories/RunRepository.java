package com.example.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.app.models.Run;
import com.example.app.models.Event;

public interface RunRepository extends JpaRepository<Run, Long>{
    List<Run> findAllByEventEventID(Long eventID);
    Event findEventByRunID(long runID);
    Run findByRunID(long runID);
}
