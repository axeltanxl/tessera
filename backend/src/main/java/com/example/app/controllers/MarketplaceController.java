package com.example.app.controllers;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.models.Marketplace;
import com.example.app.repositories.MarketplaceRepository;
import com.example.app.repositories.RunRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class MarketplaceController {

  @Autowired
  private MarketplaceRepository marketplaceRepository;

  @GetMapping("/openMarketplaces")
  public ResponseEntity<List<Marketplace>> getAllOpenMarketplaces() {

    List<Marketplace> marketplaces = marketplaceRepository.findByStatus("open");
    
    return ResponseEntity.ok(marketplaces);
  }
}