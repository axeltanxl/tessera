package com.example.app.controllers;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.configs.Middleware;
import com.example.app.models.User;
import com.example.app.models.UserDTO;
import com.example.app.repositories.UserRepository;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private Middleware midWare;

    @GetMapping("/accountDetails")
    // public ResponseEntity<User> getUser(@PathVariable("userID") Long userID) {
    public ResponseEntity<UserDTO> getUser(@RequestHeader("Authorization") String authorizationHeader) {

        final String TOKEN = authorizationHeader.replace("Bearer ", ""); // Remove "Bearer " prefix
        
        final ModelMapper modelMapper = new ModelMapper();
        String getCurrEmail = midWare.extractUsername(TOKEN);

        User user = userRepo.findByEmail(getCurrEmail);
        // Convert User entity to UserDTO, excluding the password
        UserDTO userObj = modelMapper.map(user, UserDTO.class);

        return ResponseEntity.ok(userObj);
    }

    @PostMapping("/update/{userID}")
    public ResponseEntity<Object> updateUser(@PathVariable("userID") Long userID, @RequestBody User user) {
        
        Optional<User> getUser = userRepo.findById(userID);

        if (!getUser.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        User toUpdateUser = getUser.get();
        // Update the entity with new values
        toUpdateUser.setContactNum(user.getContactNum());

        userRepo.save(toUpdateUser);
        return ResponseEntity.status(HttpStatus.CREATED).body("User updated successfully");
    }
    
    // public ResponseEntity<String> sayHello() {
    //     return ResponseEntity.ok("Unsecured");
    // }
}
