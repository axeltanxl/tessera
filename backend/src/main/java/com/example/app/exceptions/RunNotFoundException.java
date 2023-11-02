package com.example.app.exceptions;

public class RunNotFoundException extends RuntimeException {
    public RunNotFoundException(String message) {
        super(message);
    }
}
