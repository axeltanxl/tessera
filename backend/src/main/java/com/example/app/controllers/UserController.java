package com.example.app.controllers;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.configs.Middleware;
import com.example.app.models.PwUpdateDTO;
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
    @Autowired
    private PasswordEncoder passwordEncoder;

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

    @PutMapping("/{userID}/update")
    public ResponseEntity<Object> updateUser(@PathVariable("userID") Long userID, @RequestBody User reqUser) {
        
        // Get the currently authenticated user from the security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User authenticatedUser = (User) authentication.getPrincipal();

        Optional<User> getUser = userRepo.findById(userID);
        if (!getUser.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        User updateUser = getUser.get();
        // Check if the currently authenticated user matches the user being updated
        if (!(authenticatedUser.getUserID() == updateUser.getUserID())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized: Invalid resource access.");
        }

        // Update the entity with new values
        updateUser.setContactNum(reqUser.getContactNum() != null ? reqUser.getContactNum() : updateUser.getContactNum());

        // Ternary operator to set value if not null
        updateUser.setAddress(reqUser.getAddress() != null ? reqUser.getAddress() : updateUser.getAddress());
        updateUser.setEmail(reqUser.getEmail() != null ? reqUser.getEmail() : updateUser.getEmail());

        //Don't let them change Name. Why must change?
        // updateUser.setName(reqUser.);

        userRepo.save(updateUser);
        return ResponseEntity.status(HttpStatus.OK).body("User updated successfully");
    }
    
    @PutMapping("/{userID}/updatePwd")
    public ResponseEntity<Object> updateUserPassword(@PathVariable("userID") Long userID, 
    @RequestBody PwUpdateDTO reqPw) {

        // Get the currently authenticated user from the security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User authenticatedUser = (User) authentication.getPrincipal();
        
        Optional<User> getUser = userRepo.findById(userID);

        if (!getUser.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        User updateUser = getUser.get();

        // Check if the currently authenticated user matches the user being updated
        if (!(authenticatedUser.getUserID() == updateUser.getUserID())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized: Invalid resource access.");
        }

        //does not match password
        if (!passwordEncoder.matches(reqPw.getCurrPassword(), updateUser.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid user password.");
        }
        
        // Update the entity with new values
        updateUser.setPassword(reqPw.getNewPassword() != null ? passwordEncoder.encode(reqPw.getNewPassword()) 
        : updateUser.getPassword());

        userRepo.save(updateUser);
        return ResponseEntity.status(HttpStatus.OK).body("User password updated successfully");
    }

    // public ResponseEntity<String> sayHello() {
    //     return ResponseEntity.ok("Unsecured");
    // }
}
