package com.example.app.configs;

public class DuplicateListingFoundException extends RuntimeException {
    public DuplicateListingFoundException(String message) {
        super(message);
    }
}
