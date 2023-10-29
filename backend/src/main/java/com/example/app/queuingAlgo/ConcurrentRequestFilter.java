package com.example.app.queuingAlgo;

import java.io.IOException;
import java.util.concurrent.Semaphore;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class ConcurrentRequestFilter extends OncePerRequestFilter {
    private static final int MAX_CONCURRENT_REQUESTS = 50000;
    private static final Semaphore semaphore = new Semaphore(MAX_CONCURRENT_REQUESTS, true);

    @Autowired
    private QueueService queueService; // Custom queue management service

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            if (semaphore.tryAcquire()) {
                filterChain.doFilter(request, response);
            } else {
                // Admit the user to the queue
                queueService.addToQueue(request);
                response.setStatus(HttpStatus.ACCEPTED.value());
                response.getWriter().write("Your request is in line and will be processed shortly.");
            }
        } finally {
            semaphore.release();
        }
    }
}
