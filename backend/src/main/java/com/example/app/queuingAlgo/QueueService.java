package com.example.app.queuingAlgo;

import java.util.Queue;
import java.util.concurrent.LinkedBlockingQueue;

import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class QueueService {
    private Queue<HttpServletRequest> requestQueue = new LinkedBlockingQueue<>();

    // Add a request to the queue
    public void addToQueue(HttpServletRequest request) {
        requestQueue.add(request);
    }

    // Process requests from the queue in the background
    @Async
    @Scheduled(fixedDelay = 1000) // Example: Process one request every second
    public void processQueue() {
        while (!requestQueue.isEmpty()) {
            HttpServletRequest request = requestQueue.poll();
            if (request != null) {
                // Process the request here
                try {
                    // Simulate the processing by forwarding the request to a filter chain
                    HttpServletResponse response = new MockHttpServletResponse();
                    // Obtain the filter chain or create a test version
                    FilterChain filterChain = filterChain.doFilter(request, response);

                    // If the processing was successful, log it or perform additional actions
                    if (response.getStatus() == HttpServletResponse.SC_OK) {
                        // Log success or perform other actions
                    } else {
                        // Handle the case where processing failed
                        // You can log an error, notify someone, or take other actions
                    }
                } catch (Exception e) {
                    // Handle exceptions that may occur during processing
                    // You can log the exception or perform error handling
                }
            }
        }
    }
}