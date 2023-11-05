package com.example.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.app.models.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long>{
    Event findByEventID(long eventID);
}
