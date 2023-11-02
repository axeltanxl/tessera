package com.example.app.event;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.example.app.models.Event;
import com.example.app.repositories.EventRepository;

/** Start an actual HTTP server listening at a random port */
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class EventIntegrationTest {

    @LocalServerPort
    private int port;

    private final String baseUrl = "http://localhost:";

    @Autowired
    /**
     * Use TestRestTemplate for testing a real instance of your application as an
     * external actor.
     * Convenient subclass of RestTemplate that is suitable for integration tests.
     * It is fault tolerant, and optionally can carry Basic authentication headers.
     */
    private TestRestTemplate restTemplate;

    @Autowired
    private EventRepository events;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @AfterEach
    void tearDown() {
        // events.deleteAll();
    }

    @Test
    public void getEvents_Success() throws Exception {
        URI uri = new URI(baseUrl + port + "/events");
        Event event = new Event();
        event.setName("Test Event Name");
        events.save(event);

        // Need to use array with a ReponseEntity here
        // ResponseEntity<Event[]> result = restTemplate.exchange(uri, Event[].class);
        ResponseEntity<Event> result = restTemplate.getForEntity(uri, Event.class);
        assertEquals(HttpStatus.OK, result.getStatusCode());
        Event eventResponse = result.getBody();

        // Add assertions for the event properties you want to test.
        assertEquals("Test Event Name", eventResponse.getName());
    }
}