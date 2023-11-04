package com.example.app.controllers;

import java.sql.Date;
import java.time.LocalDate;
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
import com.example.app.models.Marketplace;
import com.example.app.models.Run;
import com.example.app.models.Venue;
import com.example.app.models.VenueDTO;
import com.example.app.repositories.EventRepository;
import com.example.app.repositories.MarketplaceRepository;
import com.example.app.services.EventService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.app.repositories.RunRepository;

import jakarta.validation.Valid;

@RestController
// @RequestMapping("/api/v1")
public class EventController {

  @Autowired
  private EventRepository eventRepository;

  @Autowired
  private RunRepository runRepository;
    
  @Autowired
  private ImageController imageController;

  @Autowired
  private MarketplaceRepository marketplaceRepo;
  
  @Autowired
  private EventService eventService;

  @GetMapping("/events")
  public ResponseEntity<List<EventDTO>> getAllEvents() {
    List<EventDTO> getAllEventsDTO = eventService.retrieveAllEvents();
    return ResponseEntity.ok(getAllEventsDTO);
  }

  @GetMapping(path = "/events/{eventID}")
  public ResponseEntity<Event> getEvent(@PathVariable("eventID") Long id){

    Event getEvent = eventService.retrieveOneEvent(id);

    if (getEvent == null){
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(getEvent);
  }

  @GetMapping(path = "/events/{eventID}/categories")
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

    } catch (Exception e) {
      System.out.println("Error getting categories: " + e.getMessage());
      return ResponseEntity.internalServerError().build();
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

      Date runDate = run.getDate();

      LocalDate runLocalDate = runDate.toLocalDate();

      LocalDate opening = runLocalDate.minusWeeks(2);

      // Calculate closingDate (1 day before Run date)
      LocalDate closing = runLocalDate.minusDays(1);

      java.sql.Date openingDate = Date.valueOf(opening);

      Date closingDate = Date.valueOf(closing);

      // Create a marketplace with default values
      Marketplace marketplace = new Marketplace();

      System.out.println(marketplace);
      marketplace.setStatus("not open");
      marketplace.setOpeningDate(openingDate);
      marketplace.setClosingDate(closingDate);

      Marketplace savedMarketplace = marketplaceRepo.save(marketplace);

      run.setEvent(existingEvent.get());
      run.setMarketplace(savedMarketplace);
      runRepository.save(run);

      return ResponseEntity.status(HttpStatus.CREATED).body("Run added successfully");
    } catch (Exception e) {
      System.out.println("Error while adding run for an event: " + e.getMessage());

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while adding run for an event");
    }
  }

  @GetMapping(path = "/events/{eventID}/runs")
  public ResponseEntity<List<Run>> getRunsForEvent(@PathVariable("eventID") Long id){
    Optional<Event> event = eventRepository.findById(id);

    if (!event.isPresent()){
      return ResponseEntity.notFound().build();
    }

    List<Run> runs = event.get().getRuns();

    return ResponseEntity.ok(runs);
  }

  @GetMapping(path = "/events/{eventID}/venue") 
  public ResponseEntity<VenueDTO> getVenueByEvent(@PathVariable("eventID") Long id){ 
    Optional<Event> event = eventRepository.findById(id); 
    if (!event.isPresent()){ 
      return ResponseEntity.notFound().build(); 
    }
 
    Venue venue = event.get().getVenue();

    final ModelMapper modelMapper = new ModelMapper();

    VenueDTO venueDTO = modelMapper.map(venue, VenueDTO.class);
 
    return ResponseEntity.ok(venueDTO); 
  }
}