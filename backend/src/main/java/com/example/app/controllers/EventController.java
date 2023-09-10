package com.example.app.controllers;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.models.Event;
import com.example.app.repositories.EventRepository;

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
  public ResponseEntity<Object> addEvent(@RequestBody Event event) {
    eventRepository.save(event);

    // return new ResponseEntity<Object>("Event created successfully.", HttpStatus.CREATED);

    return ResponseEntity.status(HttpStatus.CREATED).body("Event created successfully");
  }

  @GetMapping(path = "/events/{eventID}")
  public ResponseEntity<Event> getEvent(@PathVariable("eventID") Long id){
    Optional<Event> event = eventRepository.findById(id);

    if (!event.isPresent()){
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(event.get());
  }
}

