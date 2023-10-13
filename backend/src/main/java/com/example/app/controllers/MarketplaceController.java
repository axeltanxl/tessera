package com.example.app.controllers;

import java.util.*;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.models.Event;
import com.example.app.models.EventDTO;
import com.example.app.models.Marketplace;
import com.example.app.repositories.MarketplaceRepository;

@RestController
@RequestMapping("/api/v1")
public class MarketplaceController {

  @Autowired
  private MarketplaceRepository marketplaceRepository;

  @GetMapping("/openMarketplaces")
  public ResponseEntity<List<Marketplace>> getAllOpenMarketplaces() {

    List<Marketplace> marketplaces = marketplaceRepository.findByStatus("open");

    final ModelMapper modelMapper = new ModelMapper();
    for (Marketplace marketplace : marketplaces) {
      Event event = marketplace.getRun().getEvent();
      EventDTO eventDTO = modelMapper.map(event, EventDTO.class);
      marketplace.setEventDTO(eventDTO);
    }
    
    return ResponseEntity.ok(marketplaces);
  }
}