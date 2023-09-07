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
@RequestMapping("/api/v1")
public class EventController {

  @Autowired
  private EventRepository eventRepository;

  @GetMapping(path = "/events")
  public ResponseEntity<List<Event>> getAllEvents() {
    List<Event> result = eventRepository.findAll();
    System.out.println("ASDSDAD?");
    System.out.println(result);

    return ResponseEntity.ok(result);
  }

  @PostMapping(path = "/events/add")
  public ResponseEntity<Object> addEvent(@RequestBody Event event) {
    eventRepository.save(event);

    return new ResponseEntity<Object>("Event created successfully.", HttpStatus.CREATED);
  }
}