package com.example.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.multipart.MultipartFile;

import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

@Controller
public class ImageController {

    @Autowired
    private S3Client s3Client;

    public String uploadImage(MultipartFile image, String id) {
        try {
            // Upload the file to Amazon S3
            String filename = "programmes/displayImage/" + id + "/" + image.getOriginalFilename();
            PutObjectResponse response = s3Client.putObject(PutObjectRequest.builder()
                    .bucket("cs203-tessera")
                    .key(filename)
                    .build(), RequestBody.empty());
            
            if (response != null && response.sdkHttpResponse().isSuccessful()) {
              return s3Client.utilities().getUrl(GetUrlRequest.builder()
                    .bucket("cs203-tessera")
                    .key(filename)
                    .build())
                    .toExternalForm();
            } else {
              throw new RuntimeException("Failed to upload file to S3");
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to upload file: " + e.getMessage(), e);
        }
    }
}