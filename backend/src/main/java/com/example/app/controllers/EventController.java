package com.example.app.controllers;

import java.util.*;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.app.models.Event;
import com.example.app.models.EventDTO;
import com.example.app.models.Seat;
import com.example.app.models.SeatDTO;
import com.example.app.models.Ticket;
import com.example.app.models.TicketListing;
import com.example.app.models.TicketListingWithSeat;
import com.example.app.models.Run;

import com.example.app.repositories.EventRepository;
import com.example.app.repositories.SeatRepository;
import com.example.app.repositories.TicketListRepository;
import com.example.app.repositories.TicketRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.app.repositories.RunRepository;

import jakarta.validation.Valid;
import software.amazon.awssdk.services.s3.endpoints.internal.Value.Str;

@RestController
@RequestMapping("/api/v1")
public class EventController {

  @Autowired
  private EventRepository eventRepository;

  @Autowired
  private RunRepository runRepository;
  @Autowired
  private ImageController imageController;
  @Autowired
  private TicketListRepository ticketListingRepo;
  @Autowired
  private TicketRepository ticketRepo;
  @Autowired
  private SeatRepository seatRepo;

  @GetMapping("/events")
  public ResponseEntity<List<EventDTO>> getAllEvents() {
    
    final ModelMapper modelMapper = new ModelMapper();

    List<Event> listOfEvents = eventRepository.findAll();
    List<EventDTO> listOfEventsDTO = listOfEvents.stream()
      .map(eachEvent -> modelMapper.map(eachEvent, EventDTO.class))
      .collect(Collectors.toList());
    
    return ResponseEntity.ok(listOfEventsDTO);
  }

  @GetMapping(path = "/events/{eventID}")
  public ResponseEntity<Event> getEvent(@PathVariable("eventID") Long id){
    Optional<Event> event = eventRepository.findById(id);

    if (!event.isPresent()){
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(event.get());
  }

  //For the public who wants to see all the listings for 1 event
  @GetMapping("events/{eventID}/ticketListings")
  public ResponseEntity<List<TicketListingWithSeat>> getAllListingsByEventID(@PathVariable long eventID) {

      List<TicketListing> ticketListsByEventID = ticketListingRepo.findAllByEventEventID(eventID);

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
          Optional<Run> optRunObj = runRepository.findById(runID);
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

  @GetMapping(path = "events/{eventID}/categories")
  // public ResponseEntity<Object> getAllCATByEvent(@PathVariable("eventID") Long eventID){
  public ResponseEntity<List<String>> getAllCATByEvent(@PathVariable("eventID") Long eventID){

    try {
      Optional<Event> getEventObj = eventRepository.findById(eventID);

      if (!getEventObj.isPresent()) {
        return ResponseEntity.notFound().build();
      }

      String getPricePerCat = getEventObj.get().getPricePerCategory();
      String getPricePerCatJSON = getPricePerCat.replace("'", "\"");

      //Convert into Map
      // Initialize the Jackson ObjectMapper
      ObjectMapper objectMapper = new ObjectMapper();
      
      JsonNode jsonNode = objectMapper.readTree(getPricePerCatJSON);

      // Extract the values associated with keys 'A', 'B', and 'C'
      List<String> catList = new ArrayList<>();
      Iterator<Map.Entry<String, JsonNode>> iteratorFields = jsonNode.fields();
      while (iteratorFields.hasNext()) {
          Map.Entry<String, JsonNode> entry = iteratorFields.next();
          catList.add(entry.getKey());
     }

      return ResponseEntity.ok(catList);

    // try {
    //   List<TicketListing> ticketLists = ticketListingRepo.findAllByEventEventID(eventID);

    //   if (ticketLists.size() == 0) {
    //     return ResponseEntity.notFound().build();
    //   }

    //   List<Ticket> listOfTickets = new ArrayList<>();
    //   for (TicketListing eachTicketListing : ticketLists) {
    //     listOfTickets = ticketRepo.findAllByTicketID(eachTicketListing.getTicket().getTicketID());
    //   }
    
    //   List<Seat> listOfSeats = new ArrayList<>();
    //   for (Ticket eachTicket : listOfTickets) {
    //     listOfSeats = seatRepo.findAllBySeatID(eachTicket.getSeat().getSeatID());
    //   }

    //   final ModelMapper modelMapper = new ModelMapper();
    //   List<SeatDTO> listOfSeatsDTO = listOfSeats.stream()
    //   .map(eachSeat -> {
    //     SeatDTO seatDTO = modelMapper.map(eachSeat, SeatDTO.class);
    //     seatDTO.setEventID(eventID);
    //     return seatDTO;
    //   })
    //   .distinct()
    //   .collect(Collectors.toList());
                              
    //   return ResponseEntity.ok(listOfSeatsDTO);

    } catch (Exception e) {
      System.out.println("Error getting categories: " + e.getMessage());
      return ResponseEntity.internalServerError().build();
    }
  }

  @GetMapping(path = "events/{eventID}/testMethod")
  public ResponseEntity<Object> getAllCATByEventID(@PathVariable("eventID") Long eventID){
    try {
      List<TicketListing> ticketLists = ticketListingRepo.findAllByEventEventID(eventID);

      if (ticketLists.size() == 0) {
        return ResponseEntity.notFound().build();
      }

      List<Ticket> listOfTickets = new ArrayList<>();
      for (TicketListing eachTicketListing : ticketLists) {
        listOfTickets = ticketRepo.findAllByTicketID(eachTicketListing.getTicket().getTicketID());
      }
    
      List<Seat> listOfSeats = new ArrayList<>();
      for (Ticket eachTicket : listOfTickets) {
        listOfSeats = seatRepo.findAllBySeatID(eachTicket.getSeat().getSeatID());
      }

      final ModelMapper modelMapper = new ModelMapper();
      List<SeatDTO> listOfSeatsDTO = listOfSeats.stream()
      .map(eachSeat -> {
        SeatDTO seatDTO = modelMapper.map(eachSeat, SeatDTO.class);
        seatDTO.setEventID(eventID);
        return seatDTO;
      })
      .distinct()
      .collect(Collectors.toList());
                              
      return ResponseEntity.ok(listOfSeatsDTO);

    } catch (Exception e) {
      System.out.println("Error getting categories: " + e.getMessage());
      return ResponseEntity.internalServerError().body("An error occured.");
    }
  }

  @PostMapping(path = "/admin/events")
  @PreAuthorize("hasAuthority('ADMIN')")
  public ResponseEntity<Object> addEvent(@RequestPart Event event, @RequestPart(value="file") MultipartFile displayImage) {
    try {
      if (event == null || displayImage == null || displayImage.isEmpty()) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Event data or image is empty.");
      }
      
      Event savedEvent = eventRepository.save(event);
      System.out.println("Successfully saved event");
      String eventId = savedEvent.getEventID() + "";

      String imageUrl = imageController.uploadImage(displayImage, eventId);

      savedEvent.setDisplayImage(imageUrl);
      eventRepository.save(savedEvent);

      return ResponseEntity.status(HttpStatus.CREATED).body("Event created successfully");
    } catch (Exception e) {
      System.out.println("Error while adding an event: " + e.getMessage());

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while adding the event");
    }
  }

  @PutMapping(path = "/admin/events/{eventID}")
  public ResponseEntity<Object> updateEvent(@PathVariable("eventID") Long id, @RequestBody @Valid Event event) {
    try {
      Optional<Event> existingEvent = eventRepository.findById(id);

      if (!existingEvent.isPresent()) {
          return ResponseEntity.notFound().build();
      }

      BeanUtils.copyProperties(event, existingEvent.get(), "eventID");

      eventRepository.save(existingEvent.get());

      return ResponseEntity.status(HttpStatus.OK).body("Event updated successfully");
    } catch (Exception e) {
      System.out.println("Error while adding an event: " + e.getMessage());

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while adding the event");
    }
  }

  @DeleteMapping(path = "/admin/events/{eventID}")
  public ResponseEntity<Object> deleteEvent(@PathVariable("eventID") Long id) {
    try {
      if (!eventRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
      }

      eventRepository.deleteById(id);

      return ResponseEntity.status(HttpStatus.OK).body("Event deleted successfully.");
    } catch (Exception e) {
      System.out.println("Error while deleting event: " + e.getMessage());

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while deleting the event");
    }
  }

  @PostMapping(path = "/admin/events/{eventID}/runs")
  @PreAuthorize("hasAuthority('ADMIN')")
  public ResponseEntity<Object> addRun(@RequestBody Run run, @PathVariable("eventID") Long id) {
    try {
      if (run == null) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Run cannot be null.");
      }
      
      Optional<Event> existingEvent = eventRepository.findById(id);

      if (!existingEvent.isPresent()) {
          return ResponseEntity.notFound().build();
      }

      run.setEvent(existingEvent.get());
      runRepository.save(run);

      return ResponseEntity.status(HttpStatus.CREATED).body("Run added successfully");
    } catch (Exception e) {
      System.out.println("Error while adding run for an event: " + e.getMessage());

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while adding run for an event");
    }
  }
}