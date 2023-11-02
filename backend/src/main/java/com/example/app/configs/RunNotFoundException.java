package com.example.app.configs;

public class RunNotFoundException extends RuntimeException {
    public RunNotFoundException(String message) {
        super(message);
    }
}
