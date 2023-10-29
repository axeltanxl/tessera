package com.example.app.configs;

public class SeatNotFoundException extends RuntimeException {
    public SeatNotFoundException(String message) {
        super(message);
    }

    public SeatNotFoundException() {
        super("Seat not found");
    }
}