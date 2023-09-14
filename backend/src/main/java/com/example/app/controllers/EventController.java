package com.example.app.controllers;

import java.util.*;

import org.hibernate.mapping.List;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.example.app.models.Event;
import com.example.app.repositories.EventRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class EventController {

  @Autowired
  private EventRepository eventRepository;

  @GetMapping("/events")
  public ResponseEntity<List<Event>> getAllEvents() {
    List<Event> result = eventRepository.findAll();

    return ResponseEntity.ok(result);
  }

  @PostMapping(path = "/admin/addEvents")
  @PreAuthorize("hasAuthority('ADMIN')")
  public ResponseEntity<Object> addEvent(@RequestBody @Valid Event event) {
    try {
      eventRepository.save(event);

      return ResponseEntity.status(HttpStatus.CREATED).body("Event created successfully");
    } catch (Exception e) {
      System.out.println("Error while adding an event: " + e.getMessage());

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while adding the event");
    }
  }

  @GetMapping(path = "/events/{eventID}")
  public ResponseEntity<Event> getEvent(@PathVariable("eventID") Long id){
    Optional<Event> event = eventRepository.findById(id);

    if (!event.isPresent()){
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(event.get());
  }

  @PutMapping(path = "/{eventID}")
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
}