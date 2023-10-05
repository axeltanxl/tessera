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
import com.example.app.models.Run;
import com.example.app.models.UserDTO;
import com.example.app.repositories.EventRepository;
import com.example.app.repositories.RunRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class EventController {

  @Autowired
  private EventRepository eventRepository;

  @Autowired
  private RunRepository runRepository;

  @Autowired
  private ImageController imageController;

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