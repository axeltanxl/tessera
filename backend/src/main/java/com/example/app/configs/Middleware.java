package com.example.app.configs;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class Middleware {
    @Value("${jwt.secret}")
    private String jwtSecret; // Load from application properties or YAML

    // @Value("${jwt.expiration}")
    // private long jwtExpiration; // Load from application properties or YAML

    //generate token with just userDetails
    public String generateJwtToken(UserDetails userDetails) {
        return generateJwtToken(new HashMap<>(), userDetails);
    }

    public String generateJwtToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        // Date now = new Date();
        // Date expiryDate = new Date(now.getTime());
        // + jwtExpiration);

        return Jwts
            .builder()
            .setClaims(extraClaims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
            .signWith(getSignInKey(), SignatureAlgorithm.HS512)
            .compact();
    }

    //want to validate if the token belongs to the UserDetails
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    //extract expiration date from token.
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public String extractUsername(String token) {
        //Subject is email/username of the User. "Subject of the Token"
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        //one or all the list of claims
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                //similar to js SECRET KEY
                .setSigningKey(getSignInKey())
                .build()
                //Parse Token
                .parseClaimsJws(token)
                //Once pass, getBody
                .getBody();
    }

    private Key getSignInKey() {
        //decode jwt
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
        //convert to Key type in bytes.
        return Keys.hmacShaKeyFor(keyBytes);
    }

}
