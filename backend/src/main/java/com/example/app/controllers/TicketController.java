package com.example.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.models.CustOrder;
import com.example.app.models.Ticket;
import com.example.app.repositories.OrderRepository;
import com.example.app.repositories.TicketRepository;

import java.util.*;

@RestController
@RequestMapping("/api/v1/auth")
public class TicketController {

    @Autowired
    private OrderRepository orderRepository; // Rename it to match the repository name
    
    @Autowired
    private TicketRepository ticketRepository;

    @GetMapping("/tickets/user/{userID}")
    public List<Ticket> getTicketByUserID(@PathVariable long userID) {
        List<CustOrder> orders = orderRepository.findOrderByUserUserID(userID);
        List<Ticket> tickets = new ArrayList<>();
        for (CustOrder o : orders){
            List<Ticket>tix = ticketRepository.findTicketByOrderOrderID(o.getOrderID());
            for (Ticket t: tix){
                tickets.add(t);
            }
        }
        return tickets;
    }
}

