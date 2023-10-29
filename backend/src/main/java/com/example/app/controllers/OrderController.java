package com.example.app.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.intercept.RunAsUserToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.models.CustOrder;
import com.example.app.repositories.OrderRepository;
import com.example.app.models.Run;
import com.example.app.models.Ticket;
import com.example.app.repositories.RunRepository;
import com.example.app.models.Event;
import com.example.app.models.EventDTO;
import com.example.app.repositories.EventRepository;
import com.example.app.models.Venue;
import com.example.app.models.Seat;
import java.util.*;


@RestController
@RequestMapping("/api/v1")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private RunRepository runRepository;

    @Autowired
    private EventRepository eventRepository;

    @GetMapping("users/{userID}/orders")
    public List<CustOrder> getOrderByUserID(@PathVariable long userID) {
        List<CustOrder> orders = orderRepository.findOrderByUserUserID(userID);
        return orders;
    }
    
    @GetMapping("orders/{orderID}/run")
    public Run getRunByOrderID(@PathVariable long orderID) {
        Optional <CustOrder> order = orderRepository.findById(orderID);
        Run run = order.get().getRun();
        return run;
    }

    @GetMapping ("orders/{orderID}/event")
    public Event getEventByOrderID (@PathVariable long orderID) {
        Optional <CustOrder> order = orderRepository.findById(orderID);
        Event event = order.get().getRun().getEvent();
        return event;
    }

    @GetMapping ("orders/{orderID}/event/venue")
    public Venue getVenueByOrderID (@PathVariable long orderID) {
        Optional <CustOrder> order = orderRepository.findById(orderID);
        Venue venue = order.get().getRun().getEvent().getVenue();
        return venue;
    }

    @GetMapping ("orders/{orderID}/tickets")
    public List<Ticket> getTicketByOrderID (@PathVariable long orderID) {
        Optional <CustOrder> order = orderRepository.findById(orderID);
        List<Ticket> tickets = order.get().getTickets();
        return tickets;
    }

    @GetMapping ("orders/{orderID}/seats")
    public List<Seat> getSeatByOrderID (@PathVariable long orderID) {
        Optional <CustOrder> order = orderRepository.findById(orderID);
        List<Ticket> tickets = order.get().getTickets();
        List <Seat> seats = new ArrayList<>();
        for (Ticket t : tickets){
            Seat s = t.getSeat();
            seats.add(s);
        }   
        return seats;
    }
}


