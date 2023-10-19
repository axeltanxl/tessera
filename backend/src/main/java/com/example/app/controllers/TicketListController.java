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

import com.example.app.models.CustOrder;
import com.example.app.models.Run;
import com.example.app.models.Seat;
import com.example.app.models.Ticket;
import com.example.app.models.TicketListing;
import com.example.app.models.TicketListingWithSeat;
import com.example.app.models.User;
import com.example.app.repositories.OrderRepository;
import com.example.app.repositories.RunRepository;
import com.example.app.repositories.SeatRepository;
import com.example.app.repositories.TicketListRepository;
import com.example.app.repositories.TicketRepository;

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

    // to add ticketListings
    @PostMapping("runs/{runID}/tickets/{ticketID}/ticketListings")
    public ResponseEntity<String> addTicketListings(@PathVariable("runID") Long runID,
            @PathVariable("ticketID") Long ticketID, @RequestBody TicketListing reqTicketListing) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User authenticatedUser = (User) authentication.getPrincipal();

            Optional<Ticket> ticketObj = ticketRepo.findById(ticketID);
            if (!ticketObj.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ticket not found");
            }

            Ticket currTicket = ticketObj.get();
            // Check if the currently authenticated user matches the user being updated
            if (!(authenticatedUser.getUserID() == currTicket.getUser().getUserID())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized: Invalid access.");
            }

            // go order repo
            CustOrder currOrder = orderRepo.getReferenceById(currTicket.getOrder().getOrderID());
            if (reqTicketListing.getQuantity() > currOrder.getTicketQuantity() || reqTicketListing.getQuantity() == 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid quantity.");
            }
 
            // default pricing/event/status/userID.Price will be NULL
            // reqTicketListing.setPrice(currOrder.getPrice());
            // reqTicketListing.setEvent(currOrder.getEvent());
  
            reqTicketListing.setStatus("Not Listed");
            reqTicketListing.setUser(authenticatedUser);
            
            // For ticketID in TicketListing
            reqTicketListing.setTicket(currTicket);

            Optional<Run> optRun = runRepo.findById(runID);
            if (!optRun.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Run not found");
            }
            Run currRun = optRun.get();
            reqTicketListing.setRun(currRun);
            reqTicketListing.setEvent(currRun.getEvent());
            reqTicketListing.setMarketplace(currRun.getMarketplace());
            // for transactionID in ticketListing
            // reqTicketListing.setTransaction(newTrans);

            // create new transaction assign to ticketListing
            // Transaction newTrans = new Transaction();
            // newTrans.setSeller(authenticatedUser);
            // newTrans.setTicket(currTicket);
            // newTrans.setDate(reqTicketListing.getListingDate());
            // transactionRepo.save(newTrans);

            ticketListRepo.save(reqTicketListing);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Successfully created ticketlisting.");

        } catch (Exception ex) {
            System.out.println("Error while adding ticketListing: " + ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while adding ticketlisting");
        }
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
    public ResponseEntity<String> updateTicketListing(@PathVariable("listingID") Long listingID, 
    @RequestBody TicketListing requestedTicketListing) {
        try {
            if (!ticketListRepo.existsById(listingID)) {
                return ResponseEntity.notFound().build();
            }

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User authenticatedUser = (User) authentication.getPrincipal();

            // retrieve obj. Ensure that listing is associated to the correct user.
            Optional<TicketListing> optTicketListing = ticketListRepo.findById(listingID);
            TicketListing oneTicketListing = optTicketListing.get();

            // Check if the currently authenticated user matches the user being updated
            if (!(authenticatedUser.getUserID() == oneTicketListing.getUser().getUserID())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized: Invalid access.");
            }
            
            oneTicketListing.setPrice(requestedTicketListing.getPrice());
            oneTicketListing.setStatus("Listed");

            ticketListRepo.save(oneTicketListing);

            return ResponseEntity.status(HttpStatus.OK)
                    .body("Successfully updated ticketListing.");

        } catch (Exception ex) {
            System.out.println("Error while updating ticketListing: " + ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while updating ticketListing");
        }
    }

    @DeleteMapping(path = "ticketListings/{listingID}")
    public ResponseEntity<Object> deleteListing(@PathVariable("listingID") Long listingID) {
        try {
            if (!ticketListRepo.existsById(listingID)) {
                return ResponseEntity.notFound().build();
            }

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User authenticatedUser = (User) authentication.getPrincipal();

            // retrieve obj. Ensure that listing is associated to the correct user.
            Optional<TicketListing> optTicketListing = ticketListRepo.findById(listingID);
            TicketListing oneTicketListing = optTicketListing.get();

            // Check if the currently authenticated user matches the user being updated
            if (!(authenticatedUser.getUserID() == oneTicketListing.getUser().getUserID())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized: Invalid access.");
            }

            //get transactionID.
            // long getTransactionID = oneTicketListing.getTransaction().getTransactionID();

            //find and delete from table.
            ticketListRepo.deleteById(listingID);

            return ResponseEntity.status(HttpStatus.OK).body("TicketListing deleted successfully.");
        } catch (Exception e) {
            System.out.println("Error while deleting ticket listing: " + e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while deleting the ticketlisting.");
        }
    }
}
