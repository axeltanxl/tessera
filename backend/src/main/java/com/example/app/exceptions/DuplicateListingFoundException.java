package com.example.app.exceptions;

public class DuplicateListingFoundException extends RuntimeException {
    public DuplicateListingFoundException(String message) {
        super(message);
    }
}
