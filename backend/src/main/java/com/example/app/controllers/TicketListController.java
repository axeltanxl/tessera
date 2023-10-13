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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.models.CustOrder;
import com.example.app.models.Run;
import com.example.app.models.Seat;
import com.example.app.models.Ticket;
import com.example.app.models.TicketListing;
import com.example.app.models.TicketListingWithSeat;
import com.example.app.models.Transaction;
import com.example.app.models.User;
import com.example.app.repositories.OrderRepository;
import com.example.app.repositories.RunRepository;
import com.example.app.repositories.SeatRepository;
import com.example.app.repositories.TicketListRepository;
import com.example.app.repositories.TicketRepository;
import com.example.app.repositories.TransactionRepository;

import jakarta.validation.Valid;

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
    private OrderRepository orderRepo;
    @Autowired
    private TransactionRepository transactionRepo;

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

    //to add ticketListings
    @PostMapping("orders/{orderID}/runs/{runID}/ticketListings")
    public ResponseEntity<String> addTicketListings(@PathVariable("orderID") Long orderID, 
    @PathVariable("runID") Long runID, @RequestBody TicketListing reqTicketListing) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User authenticatedUser = (User) authentication.getPrincipal();

            //go order repo
            CustOrder currOrder = orderRepo.getReferenceById(orderID);

            // Check if the currently authenticated user matches the user being updated
            if (!(authenticatedUser.getUserID() == currOrder.getUser().getUserID())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized: Invalid access.");
            }

            if (reqTicketListing.getQuantity() > currOrder.getTicketQuantity() || reqTicketListing.getQuantity() == 0) {
                // int remainingTix = currOrder.getTicketQuantity() - reqTicketListing.getQuantity();
                // currOrder.setTicketQuantity(remainingTix);
                // orderRepo.save(currOrder);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid quantity.");
            }

            Optional<Ticket> ticketObj = ticketRepo.findOneTicketByOrderOrderID(orderID);
            if (!ticketObj.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ticket not found");
            }

            //default pricing/event/status/userID.
            reqTicketListing.setPrice(currOrder.getPrice());
            reqTicketListing.setEvent(currOrder.getEvent());
            reqTicketListing.setStatus("Listed");
            reqTicketListing.setUser(authenticatedUser);

            Ticket currTicket = ticketObj.get();
            //For ticketID in TicketListing
            reqTicketListing.setTicket(currTicket);

            Optional<Run> optRun = runRepo.findById(runID);
            if (!optRun.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Run not found");
            }
            Run currRun = optRun.get();
            reqTicketListing.setRun(currRun);

            //create new transaction assign to ticketListing
            Transaction newTrans = new Transaction();
            newTrans.setSeller(authenticatedUser);
            newTrans.setTicket(currTicket);
            newTrans.setDate(reqTicketListing.getListingDate());

            //for transactionID in ticketListing
            reqTicketListing.setTransaction(newTrans);
           
            transactionRepo.save(newTrans);
            ticketListRepo.save(reqTicketListing);
            
            return ResponseEntity.status(HttpStatus.CREATED).body("Successfully created ticketListing and transaction.");

        } catch (Exception ex) {
            System.out.println("Error while adding ticketListing: " + ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while adding ticketListing");
        }

    }
}
