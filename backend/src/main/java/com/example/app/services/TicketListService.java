package com.example.app.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.example.app.exceptions.DuplicateListingFoundException;
import com.example.app.exceptions.ListingNotFoundException;
import com.example.app.exceptions.RunNotFoundException;
import com.example.app.exceptions.TicketNotFoundException;
import com.example.app.exceptions.UnauthorizedException;
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

    public void addTicketListing(Authentication authentication, Long ticketID, Long runID, 
        TicketListing reqTicketListing) {

        User authenticatedUser = (User) authentication.getPrincipal();

        Optional<Ticket> ticketObj = ticketRepo.findById(ticketID);
        if (!ticketObj.isPresent()) {
            throw new TicketNotFoundException("Ticket not found.");
            // return "Ticket not found";
        }

        Ticket currTicket = ticketObj.get();
        // Check if the currently authenticated user matches the user being updated
        if (!(authenticatedUser.getUserID() == currTicket.getUser().getUserID())) {
            // return "Invalid access";
            throw new UnauthorizedException("Unauthorized: Invalid access.");
        }

        reqTicketListing.setStatus("Not Listed");
        reqTicketListing.setUser(authenticatedUser);
        
        // For ticketID in TicketListing
        reqTicketListing.setTicket(currTicket);

        Optional<Run> optRun = runRepo.findById(runID);
        if (!optRun.isPresent()) {
            // return "Run not found";
            throw new RunNotFoundException("Run not found.");
        }

        Run currRun = optRun.get();
        reqTicketListing.setRun(currRun);
        reqTicketListing.setEvent(currRun.getEvent());
        reqTicketListing.setMarketplace(currRun.getMarketplace());

        //find ticketList for duplicates
        boolean isDuplicated = isTicketListingDuplicated(ticketID, runID, currRun.getEvent().getEventID());
        if (isDuplicated) {
            // return "Duplicates found";
            throw new DuplicateListingFoundException("Duplicates found. Transaction cancelled.");
        }

        ticketListRepo.save(reqTicketListing);
    }

    public void updateTicketList(Authentication authentication, Long listingID, 
        TicketListing requestedTicketListing) {

        if (!ticketListRepo.existsById(listingID)) {
            // return "Ticket List not found";
            throw new ListingNotFoundException("Ticket Listing not found.");
        }

        User authenticatedUser = (User) authentication.getPrincipal();

        // retrieve obj. Ensure that listing is associated to the correct user.
        Optional<TicketListing> optTicketListing = ticketListRepo.findById(listingID);
        TicketListing oneTicketListing = optTicketListing.get();

        // Check if the currently authenticated user matches the user being updated
        if (!(authenticatedUser.getUserID() == oneTicketListing.getUser().getUserID())) {
            // return "Invalid access";
            throw new UnauthorizedException("Unauthorized: Invalid access.");
        }
        
        oneTicketListing.setPrice(requestedTicketListing.getPrice());
        oneTicketListing.setStatus("Listed");

        ticketListRepo.save(oneTicketListing);

        // return "Updated";
    }

    public void removeListing(Authentication authentication, Long listingID) {

        if (!ticketListRepo.existsById(listingID)) {
            // return "Ticket List not found";
            throw new ListingNotFoundException("Ticket Listing not found.");
        }

        User authenticatedUser = (User) authentication.getPrincipal();

        // retrieve obj. Ensure that listing is associated to the correct user.
        Optional<TicketListing> optTicketListing = ticketListRepo.findById(listingID);
        TicketListing oneTicketListing = optTicketListing.get();

        // Check if the currently authenticated user matches the user being updated
        if (!(authenticatedUser.getUserID() == oneTicketListing.getUser().getUserID())) {
            // return "Invalid access";
            throw new UnauthorizedException("Unauthorized: Invalid access.");
        }
        //find and delete from table.
        ticketListRepo.deleteById(listingID);

        // return "Removed";
    }

}
