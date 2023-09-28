package com.example.app.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

    import com.example.app.configs.Middleware;
    import com.example.app.models.CustOrder;
    import com.example.app.models.Ticket;
import com.example.app.models.TicketListing;
import com.example.app.models.User;
import com.example.app.models.UserDTO;
import com.example.app.repositories.TicketListRepository;
import com.example.app.repositories.UserRepository;

@RestController
@RequestMapping("/api/v1/users")
public class TicketListController {

    @Autowired
    private TicketListRepository ticketListRepo; // Rename it to match the repository name
    @Autowired
    private Middleware midWare;
    @Autowired
    private UserRepository userRepo;

    @GetMapping("ticketListing/{listingID}")
    public ResponseEntity<Object> getListingByTicketID(@RequestHeader("Authorization") String authorizationHeader, 
    @PathVariable long listingID) {
        
        final String TOKEN = authorizationHeader.replace("Bearer ", ""); // Remove "Bearer " prefix
        
        final ModelMapper modelMapper = new ModelMapper();
        String getCurrEmail = midWare.extractUsername(TOKEN);

        User user = userRepo.findByEmail(getCurrEmail);

        // Convert User entity to UserDTO, excluding the password
        UserDTO userObj = modelMapper.map(user, UserDTO.class);

        Optional<TicketListing> ticketList = ticketListRepo.findById(listingID);
        if (!ticketList.isPresent() || ticketList.get().getUser().getUserID() != userObj.getUserID()) {
            return ResponseEntity.notFound().build();
        }

        // String getCurrListing = 
        return ResponseEntity.ok(ticketList);
    }

     public ResponseEntity<UserDTO> getUser(@RequestHeader("Authorization") String authorizationHeader) {

        final String TOKEN = authorizationHeader.replace("Bearer ", ""); // Remove "Bearer " prefix
        
        final ModelMapper modelMapper = new ModelMapper();
        String getCurrEmail = midWare.extractUsername(TOKEN);

        User user = userRepo.findByEmail(getCurrEmail);
        // Convert User entity to UserDTO, excluding the password
        UserDTO userObj = modelMapper.map(user, UserDTO.class);

        return ResponseEntity.ok(userObj);
    }
}
