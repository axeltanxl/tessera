package com.example.app.ticketlist;
import static org.junit.jupiter.api.Assertions.*;

import java.net.URI;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.example.app.models.Ticket;
import com.example.app.models.TicketListing;
import com.example.app.repositories.TicketListRepository;
import com.example.app.repositories.TicketRepository;
import java.util.*;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class TicketListIntegrationTest {

	@LocalServerPort
	private int port;

	private final String baseUrl = "http://localhost:";

	@Autowired
	/**
	 * Use TestRestTemplate for testing a real instance of your application as an external actor.
	 * Convenient subclass of RestTemplate that is suitable for integration tests.
 	 * It is fault tolerant, and optionally can carry Basic authentication headers.
	 */
	private TestRestTemplate restTemplate;

	@Autowired
    private TicketRepository tickets;
	@Autowired
    private TicketListRepository ticketListings;
	@Autowired
	private BCryptPasswordEncoder encoder;


	@AfterEach
	void tearDown(){
		// books.deleteAll();
		// users.deleteAll();
	}

    @Test
    public void getTicketListingsByTicketID_Success() throws Exception{
        //create a mock ticket first 
        Ticket ticket = new Ticket();
        ticket.setTicketID(6);
        ticket.setUniqueCode("123");
        
        //create mock ticketlisting associated with the ticket
        TicketListing ticketListing = new TicketListing();
        List<TicketListing> ticketListingList = new ArrayList<>();
        ticketListingList.add(ticketListing);

        ticket.setTicketListings(ticketListingList);
        tickets.save(ticket);
        URI uri = new URI(baseUrl + port + "/ticketListings/tickets/" + ticket.getTicketID());

    }   
}