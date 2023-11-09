package com.example.app.ticketlist;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.app.models.Run;
import com.example.app.models.Ticket;
import com.example.app.models.TicketListing;
import com.example.app.models.User;
import com.example.app.repositories.RunRepository;
import com.example.app.repositories.TicketListRepository;
import com.example.app.repositories.TicketRepository;
import com.example.app.services.TicketListService;

@ExtendWith(MockitoExtension.class)
public class TicketListingServiceTest {
    @Mock
    private TicketListRepository ticketListRepo;

    @Mock
    private RunRepository runRepo;

    @Mock
    private TicketRepository ticketRepo;


    @InjectMocks
   private TicketListService ticketListService;
    
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void isTicketListingDuplicated_DuplicateExists() {
        //arrange ***
        Long ticketID = 1L;
        Long runID = 1L;
        Long eventID = 1L;

        TicketListing mockTicketListing = new TicketListing();
        when(ticketListRepo.findByTicketTicketIDAndEventEventIDAndRunRunID(ticketID, eventID, runID)).thenReturn(Optional.of(mockTicketListing));

        //act ***
        boolean isDuplicate = ticketListService.isTicketListingDuplicated(ticketID, runID, eventID);

        //assert ***
        assertTrue(isDuplicate);
        verify(ticketListRepo).findByTicketTicketIDAndEventEventIDAndRunRunID(ticketID, eventID, runID);
    }   

    @Test
    void isTicketListingDuplicated_NoDuplicateExists(){
        //arrange ***
        Long ticketID = 1L;
        Long runID = 2L;
        Long eventID = 3L;

        when(ticketListRepo.findByTicketTicketIDAndEventEventIDAndRunRunID(ticketID, eventID, runID)).thenReturn(Optional.empty());
        
        //act ***
        boolean isDuplicate = ticketListService.isTicketListingDuplicated(ticketID, runID, eventID);

        //assert ***
        assertFalse(isDuplicate);
        verify(ticketListRepo).findByTicketTicketIDAndEventEventIDAndRunRunID(ticketID, eventID, runID);
    }


   
}
