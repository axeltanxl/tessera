package com.example.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.models.CustOrder;
import com.example.app.models.Ticket;
import com.example.app.models.TicketDTO;
import com.example.app.models.TicketListing;
import com.example.app.models.User;
import com.example.app.repositories.OrderRepository;
import com.example.app.repositories.TicketListRepository;
import com.example.app.repositories.TicketRepository;
import com.example.app.repositories.UserRepository;

import java.util.*;

@RestController
@RequestMapping("/api/v1")
public class TicketController {

    @Autowired
    private OrderRepository orderRepository; // Rename it to match the repository name

    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private TicketListRepository ticketListRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("users/{userID}/tickets")
    public List<Ticket> getTicketsByUserID(@PathVariable long userID) {
        List<CustOrder> orders = orderRepository.findOrderByUserUserID(userID);
        List<Ticket> tickets = new ArrayList<>();
        for (CustOrder o : orders) {
            List<Ticket> tix = ticketRepository.findTicketByOrderOrderID(o.getOrderID());
            for (Ticket t : tix) {
                tickets.add(t);
            }
        }
        return tickets;
    }

    @GetMapping("users/{userID}/listedTickets")
    public ResponseEntity<List<TicketDTO>> getListedTicketsByUser(@PathVariable("userID") Long userID) {
        try {
            // Get the currently authenticated user from the security context
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User authenticatedUser = (User) authentication.getPrincipal();

            Optional<User> getUser = userRepository.findById(userID);
            if (!getUser.isPresent()) {
                return ResponseEntity.notFound().build();
            }
            // Check if the currently authenticated user matches the user being updated
            if (!(authenticatedUser.getUserID() == getUser.get().getUserID())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            // find all associated ticketListings with logged in user.
            List<TicketListing> listOfTicketListings = ticketListRepository.findAllByUserUserID(userID);

            List<TicketDTO> listOfTickets = new ArrayList<>();
            for (TicketListing eachTicketListing : listOfTicketListings) {
                Ticket eachTicket = eachTicketListing.getTicket();
                TicketDTO ticketDTO = new TicketDTO();

                ticketDTO.setTicketID(eachTicket.getTicketID());
                ticketDTO.setSeat(eachTicket.getSeat());
                ticketDTO.setEvent(eachTicketListing.getEvent());
                ticketDTO.setRun(eachTicketListing.getRun());

                listOfTickets.add(ticketDTO);
            }

            return ResponseEntity.ok(listOfTickets);

        } catch (Exception ex) {
            System.out.println("Error getting listed tickets: " + ex.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("users/{userID}/orders")
    public List<CustOrder> getOrdersByUserID(@PathVariable long userID) {
        List<CustOrder> orders = orderRepository.findOrderByUserUserID(userID);
        return orders;
    }

    // @GetMapping("/users/{userID}/tickets/{orderID}")
    // public List<Ticket> getTicketsByOrderID(@PathVariable long orderID) {
    // return ticketRepository.findTicketByOrderOrderID(orderID);
    // }
}