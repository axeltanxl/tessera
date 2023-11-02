package com.example.app.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.configs.DuplicateListingFoundException;
import com.example.app.configs.ListingNotFoundException;
import com.example.app.configs.RunNotFoundException;
import com.example.app.configs.TicketNotFoundException;
import com.example.app.configs.UnauthorizedException;
import com.example.app.models.Run;
import com.example.app.models.Seat;
import com.example.app.models.Ticket;
import com.example.app.models.TicketListing;
import com.example.app.models.TicketListingWithSeat;
import com.example.app.models.User;
import com.example.app.repositories.RunRepository;
import com.example.app.repositories.SeatRepository;
import com.example.app.repositories.TicketListRepository;
import com.example.app.repositories.TicketRepository;
import com.example.app.services.TicketListService;

@RestController
@RequestMapping("/api/v1/")
public class TicketListController {

    @Autowired
    private TicketListRepository ticketListRepo; // Rename it to match the repository name

    @Autowired
    private TicketRepository ticketRepo;
    @Autowired
    private SeatRepository seatRepo;
    @Autowired
    private RunRepository runRepo;

    @Autowired
    private TicketListService ticketListService;

    // For general public who wants to see each listing.
    @GetMapping("ticketListings/{listingID}")
    public ResponseEntity<Object> getListingByTicketListID(@PathVariable long listingID) {

        Optional<TicketListing> eachTicket = ticketListRepo.findById(listingID);
        if (!eachTicket.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(eachTicket);
    }

    // For the public who wants to see all the listings
    @GetMapping("ticketListings")
    public ResponseEntity<List<TicketListing>> getAllListings() {
        List<TicketListing> ticketLists = ticketListRepo.findAll();

        return ResponseEntity.ok(ticketLists);
    }

    //Get all ticket listing with ticketID 
    @GetMapping("ticketListings/tickets/{ticketID}")
    public ResponseEntity<List<TicketListing>> getListingByTicketID(@PathVariable long ticketID) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User authenticatedUser = (User) authentication.getPrincipal();

        List<TicketListing> ticketListingsByTix = 
        ticketListRepo.findAllByTicketTicketIDAndUserUserID(ticketID, authenticatedUser.getUserID());

        if (ticketListingsByTix.isEmpty() || ticketListingsByTix == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(ticketListingsByTix);
    }

    // For the public who wants to see all the listings for 1 event
    @GetMapping("events/{eventID}/ticketListings")
    public ResponseEntity<List<TicketListingWithSeat>> getAllListingsByEventID(@PathVariable long eventID) {

        List<TicketListing> ticketListsByEventID = ticketListRepo.findAllByEventEventID(eventID);

        if (ticketListsByEventID.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        // Create a map to group TicketListings by listingID
        Map<Long, TicketListingWithSeat> ticketListingsMap = new HashMap<>();

        for (TicketListing ticketListing : ticketListsByEventID) {
            TicketListingWithSeat ticketListingWithSeat = new TicketListingWithSeat();
            ticketListingWithSeat.setTicketListing(ticketListing);

            // Fetch and associate the Seat with the TicketListing
            Long ticketID = ticketListing.getTicket().getTicketID();
            Optional<Ticket> optTicketObj = ticketRepo.findById(ticketID);

            if (optTicketObj.isPresent()) {
                Ticket ticket = optTicketObj.get();
                Long seatID = ticket.getSeat().getSeatID();
                Optional<Seat> optSeatObj = seatRepo.findById(seatID);

                if (optSeatObj.isPresent()) {
                    Seat seat = optSeatObj.get();
                    ticketListingWithSeat.setSeat(seat);
                }
            }

            // Fetch and associate the Run with the TicketListing
            Long runID = ticketListing.getRun().getRunID();
            Optional<Run> optRunObj = runRepo.findById(runID);
            if (optRunObj.isPresent()) {
                Run run = optRunObj.get();
                ticketListingWithSeat.setRun(run);
            }

            // Add the TicketListingWithSeat to the map
            ticketListingsMap.put(ticketListing.getListingID(), ticketListingWithSeat);
        }

        // Convert values of the map (TicketListingWithSeat objects) into a list
        List<TicketListingWithSeat> ticketListsWithSeats = new ArrayList<>(ticketListingsMap.values());

        return ResponseEntity.ok(ticketListsWithSeats);
    }

    // to add ticketListings
    @PostMapping("runs/{runID}/tickets/{ticketID}/ticketListings")
    public ResponseEntity<String> addTicketListings(Authentication authentication, 
        @PathVariable("runID") Long runID, @PathVariable("ticketID") Long ticketID, 
        @RequestBody TicketListing reqTicketListing) {

        // try {
            String addTicketListStatus = ticketListService.addTicketListing(authentication, ticketID, runID, reqTicketListing);

            if (addTicketListStatus.equals("Invalid access")) {
                throw new UnauthorizedException("Unauthorized: Invalid access.");
            }

            if (addTicketListStatus.equals("Ticket not found")) {
                throw new TicketNotFoundException("Ticket not found. Transaction cancelled.");
            }

            if (addTicketListStatus.equals("Duplicates found")) {
                throw new DuplicateListingFoundException("Duplicates found. Transaction cancelled.");
            }

            if (addTicketListStatus.equals("Run not found")) {
                throw new RunNotFoundException("Run not found. Transaction cancelled.");
            }

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Successfully created ticketlisting.");

        // } 
        // catch (Exception ex) {
        //     System.out.println("Error while adding ticketListing: " + ex.getMessage());
        //     return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        //             .body("An error occurred while adding ticketlisting");
        // }
    }

    // private boolean isAuthorized(Long listingID) {
    //     Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    //     User authenticatedUser = (User) authentication.getPrincipal();

    //     // retrieve obj. Ensure that listing is associated to the correct user.
    //     Optional<TicketListing> optTicketListing = ticketListRepo.findById(listingID);
    //     TicketListing oneTicketListing = optTicketListing.get();

    //     // Check if the currently authenticated user matches the user being updated
    //     if (!(authenticatedUser.getUserID() == oneTicketListing.getUser().getUserID())) {
    //         return false;
    //     }
    //     return true;
    // }

    //Update listing with price.
    @PutMapping("ticketListings/{listingID}")
    public ResponseEntity<String> updateTicketListing(Authentication authentication, 
        @PathVariable("listingID") Long listingID, @RequestBody TicketListing requestedTicketListing) {
        // try {
            String updateTicketListStatus = ticketListService.updateTicketList(authentication, listingID, requestedTicketListing);

            if (updateTicketListStatus.equals("Invalid access")) {
                throw new UnauthorizedException("Unauthorized: Invalid access.");
            }

            if (updateTicketListStatus.equals("Ticket List not found")) {
                throw new ListingNotFoundException("Listing ID is invalid.");
            }
           
            return ResponseEntity.status(HttpStatus.OK)
                    .body("Successfully updated ticketListing.");
    }

    @DeleteMapping(path = "ticketListings/{listingID}")
    public ResponseEntity<Object> deleteListing(Authentication authentication, 
        @PathVariable("listingID") Long listingID) {
        // try {
            String deleteTicketListStatus = ticketListService.removeListing(authentication, listingID);

            if (deleteTicketListStatus.equals("Invalid access")) {
                throw new UnauthorizedException("Unauthorized: Invalid access.");
            }

            if (deleteTicketListStatus.equals("Ticket List not found")) {
                throw new ListingNotFoundException("Listing ID is invalid.");
            }

            return ResponseEntity.status(HttpStatus.OK).body("TicketListing deleted successfully.");
        // } catch (Exception e) {
        //     System.out.println("Error while deleting ticket listing: " + e.getMessage());

        //     return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        //             .body("An error occurred while deleting the ticketlisting.");
        // }
    }
}
