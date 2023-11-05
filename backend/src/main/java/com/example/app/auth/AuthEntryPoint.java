package com.example.app.auth;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.Instant;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AuthEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, 
        AuthenticationException authException) throws IOException {
        
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String jsonResponse = "{";
        jsonResponse += "\"timestamp\": \"" + Instant.now() + "\",";
        jsonResponse += "\"status\": " + HttpServletResponse.SC_UNAUTHORIZED + ",";
        jsonResponse += "\"message\": \"Unauthorized\",";
        jsonResponse += "\"path\": \"" + request.getRequestURI() + "\"";
        jsonResponse += "}";

        PrintWriter writer = response.getWriter();
        writer.write(jsonResponse);
    }
}