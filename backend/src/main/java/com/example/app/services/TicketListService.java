package com.example.app.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.app.models.Run;
import com.example.app.models.Ticket;
import com.example.app.models.TicketListing;
import com.example.app.models.User;
import com.example.app.repositories.RunRepository;
import com.example.app.repositories.TicketListRepository;
import com.example.app.repositories.TicketRepository;

@Service
public class TicketListService {
    
    @Autowired
    private TicketListRepository ticketListRepo;
    @Autowired
    private TicketRepository ticketRepo;
    @Autowired
    private RunRepository runRepo;

    public boolean isTicketListingDuplicated(Long ticketID, Long runID, Long eventID) {

        Optional<TicketListing> ticketListObj = ticketListRepo.findByTicketTicketIDAndEventEventIDAndRunRunID(ticketID, eventID, runID);
        
        if (ticketListObj.isPresent()) {
            return true;
        }
        return false;
    }

    public String addTicketListing(Authentication authentication, Long ticketID, Long runID, 
        TicketListing reqTicketListing) {

        User authenticatedUser = (User) authentication.getPrincipal();

        Optional<Ticket> ticketObj = ticketRepo.findById(ticketID);
        if (!ticketObj.isPresent()) {
            return "Ticket not found";
        }

        Ticket currTicket = ticketObj.get();
        // Check if the currently authenticated user matches the user being updated
        if (!(authenticatedUser.getUserID() == currTicket.getUser().getUserID())) {
            return "Invalid access";
        }

        reqTicketListing.setStatus("Not Listed");
        reqTicketListing.setUser(authenticatedUser);
        
        // For ticketID in TicketListing
        reqTicketListing.setTicket(currTicket);

        Optional<Run> optRun = runRepo.findById(runID);
        if (!optRun.isPresent()) {
            return "Run not found";
        }

        Run currRun = optRun.get();
        reqTicketListing.setRun(currRun);
        reqTicketListing.setEvent(currRun.getEvent());
        reqTicketListing.setMarketplace(currRun.getMarketplace());

        //find ticketList for duplicates
        boolean isDuplicated = isTicketListingDuplicated(ticketID, runID, currRun.getEvent().getEventID());
        if (isDuplicated) {
            return "Duplicates found";
        }

        ticketListRepo.save(reqTicketListing);

        return "Saved";
    }

    public String updateTicketList(Authentication authentication, Long listingID, 
        TicketListing requestedTicketListing) {

        if (!ticketListRepo.existsById(listingID)) {
            return "Ticket List not found";
        }

        User authenticatedUser = (User) authentication.getPrincipal();

        // retrieve obj. Ensure that listing is associated to the correct user.
        Optional<TicketListing> optTicketListing = ticketListRepo.findById(listingID);
        TicketListing oneTicketListing = optTicketListing.get();

        // Check if the currently authenticated user matches the user being updated
        if (!(authenticatedUser.getUserID() == oneTicketListing.getUser().getUserID())) {
            return "Invalid access";        
        }
        
        oneTicketListing.setPrice(requestedTicketListing.getPrice());
        oneTicketListing.setStatus("Listed");

        ticketListRepo.save(oneTicketListing);

        return "Updated";
    }

    public String removeListing(Authentication authentication, Long listingID) {

        if (!ticketListRepo.existsById(listingID)) {
            return "Ticket List not found";
        }

        User authenticatedUser = (User) authentication.getPrincipal();

        // retrieve obj. Ensure that listing is associated to the correct user.
        Optional<TicketListing> optTicketListing = ticketListRepo.findById(listingID);
        TicketListing oneTicketListing = optTicketListing.get();

        // Check if the currently authenticated user matches the user being updated
        if (!(authenticatedUser.getUserID() == oneTicketListing.getUser().getUserID())) {
            return "Invalid access";
        }
        //find and delete from table.
        ticketListRepo.deleteById(listingID);

        return "Removed";
    }

}
