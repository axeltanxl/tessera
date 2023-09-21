package com.example.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import java.io.IOException;

@RestController
@RequestMapping("/image")
public class ImageController {

    @Autowired
    private S3Client s3Client;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        System.out.println("HELLO TESTING");
        try {
            // Upload the file to Amazon S3
            s3Client.putObject(PutObjectRequest.builder()
                    .bucket("cs203-tessera")
                    .key(file.getOriginalFilename())
                    .build(), file.getInputStream());
            return ResponseEntity.ok("File uploaded successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to upload file: " + e.getMessage());
        }
    }
}