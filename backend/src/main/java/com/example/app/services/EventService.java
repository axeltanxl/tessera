package com.example.app.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.example.app.controllers.ImageController;
import com.example.app.models.Event;
import com.example.app.models.EventDTO;
import com.example.app.repositories.EventRepository;
import com.example.app.repositories.MarketplaceRepository;
import com.example.app.repositories.RunRepository;

public class EventService {
    @Autowired
    private EventRepository eventRepository;

    //Get All Events
    public List<EventDTO> retrieveAllEvents() {
        final ModelMapper modelMapper = new ModelMapper();

        List<Event> listOfEvents = eventRepository.findAll();
        List<EventDTO> listOfEventsDTO = listOfEvents.stream()
            .map(eachEvent -> modelMapper.map(eachEvent, EventDTO.class))
            .collect(Collectors.toList());

        return listOfEventsDTO;
    }

    //Get Each Event By eventID
    public Event retrieveOneEvent(Long eventID) {

        Optional<Event> event = eventRepository.findById(eventID);
        if (!event.isPresent()){
            return null;
        }

        return event.get();
    }
}
