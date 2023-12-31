package com.example.app.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.app.models.TicketListing;

public interface TicketListRepository extends JpaRepository<TicketListing, Long>{
    List<TicketListing> findAllByEventEventID(Long eventID);
    List<TicketListing> findAllByEventEventIDAndStatus(Long eventID, String status);
    List<TicketListing> findAllByUserUserID(Long userID);
    List<TicketListing> findAllByTicketTicketIDAndUserUserID(Long ticketID, Long userID);

    TicketListing findByTicketTicketID(Long ticketID);

    Optional<TicketListing> findByTicketTicketIDAndEventEventIDAndRunRunID(Long ticketID, 
        Long eventID, Long runID);
}
