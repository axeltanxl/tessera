package com.example.app.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.models.TicketListing;
import com.example.app.repositories.TicketListRepository;

@RestController
@RequestMapping("/api/v1/users")
public class TicketListController {

    @Autowired
    private TicketListRepository ticketListRepo; // Rename it to match the repository name

    //For general public who wants to see each listing.
    @GetMapping("ticketListing/{listingID}")
    public ResponseEntity<Object> getListingByTicketListID(@PathVariable long listingID) {

        Optional<TicketListing> eachTicket = ticketListRepo.findById(listingID);
        if (!eachTicket.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(eachTicket);
    }

    //For the public who wants to see all the listings
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
    // public ResponseEntity<Object> getListingByTicketListID(@RequestHeader("Authorization") String authorizationHeader, 
    // @PathVariable long listingID) {
        
    //     final String TOKEN = authorizationHeader.replace("Bearer ", ""); // Remove "Bearer " prefix
        
    //     final ModelMapper modelMapper = new ModelMapper();
    //     String getCurrEmail = midWare.extractUsername(TOKEN);

    //     User user = userRepo.findByEmail(getCurrEmail);

    //     // Convert User entity to UserDTO, excluding the password
    //     UserDTO userObj = modelMapper.map(user, UserDTO.class);

    //     Optional<TicketListing> ticketList = ticketListRepo.findById(listingID);
    //     if (!ticketList.isPresent() || ticketList.get().getUser().getUserID() != userObj.getUserID()) {
    //         return ResponseEntity.notFound().build();
    //     }

    //     // String getCurrListing = 
    //     return ResponseEntity.ok(ticketList);
    // }
}
