package com.example.app.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.exceptions.DuplicateUsernameException;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService service;

    @PostMapping("/register") // Map ONLY POST Requests
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        
        // return ResponseEntity.ok(service.register(request));

        try {
            // Attempt to register the user
            AuthenticationResponse response = service.register(request);
            return ResponseEntity.ok(response);

        } catch (DuplicateUsernameException e) {
            // Handle the DuplicateUsernameException
            AuthenticationResponse errorResponse = AuthenticationResponse.builder()
                .message("Email has been taken.")
                .build();

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @PostMapping(path = "/login") // Map ONLY POST Requests
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request)
        throws UsernameNotFoundException {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        // return ResponseEntity.ok(service.authenticate(request));

        // Attempt to login the user
        try {
            AuthenticationResponse authResp = service.authenticate(request);

            return ResponseEntity.ok(authResp);
        } catch (BadCredentialsException credEx) {
            
            AuthenticationResponse errorResp = AuthenticationResponse.builder()
                .message("Username/Password is invalid.")
                .build();

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResp);
        } catch (Exception ex) {
            AuthenticationResponse err = AuthenticationResponse.builder().message(ex.getMessage())
                .build();

            return ResponseEntity.internalServerError().body(err);
        }
        

    }

}
