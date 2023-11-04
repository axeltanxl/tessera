package com.example.app.queuingAlgo;

import jakarta.websocket.server.ServerEndpoint;
import jakarta.websocket.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@ServerEndpoint("ws://localhost:8080/api/v1/ws")
public class WebSocketController {

    Logger logger = LoggerFactory.getLogger(WebSocketController.class);

    @OnOpen
    public void onOpen(Session session) {
        System.out.println("HELLOSIR");
        // Code to handle connection opening
        logger.info("WebSocket connection opened: Session ID = {}", session.getId());
    }

    @OnClose
    public void onClose(Session session, CloseReason closeReason) {
        // This method is called when a client disconnects from the WebSocket endpoint
        // You can perform actions, such as logging the reason for closing
        logger.info("WebSocket connection closed: Session ID = {}, Reason = {}", session.getId(), closeReason);
    }

    @OnMessage
    public void onMessage(String message, Session session) {
        // Log when a message is received and process it
        logger.info("Received message from Session ID {}: {}", session.getId(), message);
        // Process and respond to the message
    }
}