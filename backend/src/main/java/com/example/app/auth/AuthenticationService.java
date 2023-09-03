package com.example.app.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.app.configs.DuplicateUsernameException;
import com.example.app.configs.Middleware;
import com.example.app.models.Role;
import com.example.app.models.User;
import com.example.app.repositories.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    private final Middleware jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {

        // try {

        // User getUser = userRepo.findByEmail(request.getEmail());
        if (userRepo.existsByEmail(request.getEmail())) {
            throw new DuplicateUsernameException("Username (email) is already in use.");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .contactNum(request.getContactNum())
                .address(request.getAddress())
                .role(Role.USER)
                .build();

        userRepo.save(user);

        String jwtToken = jwtService.generateJwtToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .message("Registration successful.")
                .build();
        // } catch (Exception ex) {
        // ex.printStackTrace();
        // }
        // return null;
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));

        // Authenticated
        User user = userRepo.findByEmail(request.getEmail());

        String jwtToken = jwtService.generateJwtToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
