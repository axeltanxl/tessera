package com.example.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.app.models.TicketListing;

public interface TicketListRepository extends JpaRepository<TicketListing, Long>{
    List<TicketListing> findAllByEventEventID(Long eventID);
    List<TicketListing> findAllByUserUserID(Long userID);
}
