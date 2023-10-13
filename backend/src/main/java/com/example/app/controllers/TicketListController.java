package com.example.app.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.models.Run;
import com.example.app.models.Seat;
import com.example.app.models.Ticket;
import com.example.app.models.TicketListing;
import com.example.app.models.TicketListingWithSeat;
import com.example.app.repositories.RunRepository;
import com.example.app.repositories.SeatRepository;
import com.example.app.repositories.TicketListRepository;
import com.example.app.repositories.TicketRepository;

@RestController
@RequestMapping("/api/v1/users")
public class TicketListController {

    @Autowired
    private TicketListRepository ticketListRepo; // Rename it to match the repository name

    @Autowired
    private TicketRepository ticketRepo;
    @Autowired
    private SeatRepository seatRepo;
    @Autowired
    private RunRepository runRepo;

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

    /* UNUSED METHOD */
    // @Autowired
    // private Middleware midWare;
    // @Autowired
    // private UserRepository userRepo;

    // @GetMapping("ticketListing/{listingID}")
    // public ResponseEntity<Object>
    // getListingByTicketListID(@RequestHeader("Authorization") String
    // authorizationHeader,
    // @PathVariable long listingID) {

    // final String TOKEN = authorizationHeader.replace("Bearer ", ""); // Remove
    // "Bearer " prefix

    // final ModelMapper modelMapper = new ModelMapper();
    // String getCurrEmail = midWare.extractUsername(TOKEN);

    // User user = userRepo.findByEmail(getCurrEmail);

    // // Convert User entity to UserDTO, excluding the password
    // UserDTO userObj = modelMapper.map(user, UserDTO.class);

    // Optional<TicketListing> ticketList = ticketListRepo.findById(listingID);
    // if (!ticketList.isPresent() || ticketList.get().getUser().getUserID() !=
    // userObj.getUserID()) {
    // return ResponseEntity.notFound().build();
    // }

    // // String getCurrListing =
    // return ResponseEntity.ok(ticketList);
    // }

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
}
