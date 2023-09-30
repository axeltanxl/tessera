package com.example.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.app.models.TicketListing;

public interface TicketListRepository extends JpaRepository<TicketListing, Long>{
    
}
