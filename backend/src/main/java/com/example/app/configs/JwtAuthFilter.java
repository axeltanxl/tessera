package com.example.app.configs;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.io.IOException;

@Component
// will create a contructor with public class. So dont need write urself
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final Middleware jwtService;

    //fetch user from DB. So final.
    private final UserDetailsService userDetailsService;

    // public JwtAuthFilter(Middleware jwtTokenProvider) {
    // this.jwtTokenProvider = jwtTokenProvider;
    // }
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, 
                                    @NonNull HttpServletResponse response, 
                                    @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        try {
            final String authHeader = request.getHeader("Authorization");
            final String jwtToken;
            final String userEmail;

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication(); 

            if (authHeader == null || !authHeader.startsWith("Bearer ") || 
            authentication == null && (authentication instanceof AnonymousAuthenticationToken)) {
                // if null and not valid will pass on to the next "Filter"
                filterChain.doFilter(request, response);
                return;
            }

            jwtToken = authHeader.substring(7);
            // extract username from JWT token
            userEmail = jwtService.extractUsername(jwtToken);

            // validation
            // ... && if == null means user is not authenticated yet.
            if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

                if (jwtService.isTokenValid(jwtToken, userDetails)) {
                    //needed by Spring and SecurityContextHolder in order to update SecurityContext.
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()
                    );
                    //reinforce token with details of the requests
                    authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                    );
                    //update authToken
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
            //this is like auth.next(); in JS
            filterChain.doFilter(request, response);

        } catch (Exception ex) {
            // Handle any exceptions here
        }

        // Continue the filter chain
        filterChain.doFilter(request, response);
    }

}
