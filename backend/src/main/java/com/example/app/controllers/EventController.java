package com.example.app.controllers;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.models.Event;
import com.example.app.repositories.EventRepository;

@RestController
@RequestMapping("/api/v1/events")
public class EventController {

  @Autowired
  private EventRepository eventRepository;

  @GetMapping(path = "")
  public ResponseEntity<List<Event>> getAllEvents() {
    List<Event> result = eventRepository.findAll();

    return ResponseEntity.ok(result);
  }

  @PostMapping(path = "")
  public ResponseEntity<Object> addEvent(@RequestBody Event event) {
    eventRepository.save(event);

    return new ResponseEntity<Object>("Event created successfully.", HttpStatus.CREATED);
  }
}