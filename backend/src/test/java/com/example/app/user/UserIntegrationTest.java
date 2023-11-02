package com.example.app.user;
import static org.junit.jupiter.api.Assertions.*;

import java.net.URI;
import java.util.Optional;

import org.springframework.boot.test.context.SpringBootTest;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.example.app.models.Role;
import com.example.app.models.User;
import com.example.app.repositories.UserRepository;

/** Start an actual HTTP server listening at a random port */
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class UserIntegrationTest {
    @LocalServerPort
	private int port;

	private final String baseUrl = "http://localhost:";

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
	private UserRepository users;

    @Autowired
	private BCryptPasswordEncoder encoder;

    @AfterEach
	void tearDown() {
		// clear the database after each test
		users.deleteAll();
	}


    // @Test
    // public void updateAccountDetails_Success() throws Exception{
    //     User user = new User("TestName", "test@gmail.com", encoder.encode("goodpassword"), "91234567", "Address 123", Role.USER);       
    //     users.save(user);
    //     users.deleteAll();
    //     // long userID = user.getUserID();
    //     // URI uri = new URI(baseUrl + port + "/users/" + userID + "/update");
    //     // User newUserInfo = new User("NewName","test@gmail.com", encoder.encode("goodpassword"), "91234567", "Address 123", Role.USER);
        
    //     // String jwtToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYWNrQGdtYWlsLmNvbSIsImlhdCI6MTY5ODkwMTAxMiwiZXhwIjoxNjk4OTA0NjEyfQ.vVHTt7CB8fNjtWuj4ivvZkoiT3wLjNTmG4U4yvmenN6R6G0r8_z9AhfIcn7Jk2hG9AHQNlb61Cl0pJPAhUbFcA";
    //     // ResponseEntity<User> result = restTemplate.withBasicAuth("test@gmail.com", "goodpassword").exchange(uri, HttpMethod.PUT, new HttpEntity<>(newUserInfo, createAuthorizationHeader(jwtToken)), User.class);
        
    //     // // ResponseEntity<User> result = restTemplate
    //     // // .exchange(uri, HttpMethod.PUT, new HttpEntity<>(newUserInfo, createAuthorizationHeader(jwtToken)), User.class);

    //     // assertEquals(200, result.getStatusCode().value());
    //     // assertEquals(newUserInfo.getName(), result.getBody().getName());
    // }

    // private HttpHeaders createAuthorizationHeader(String jwtToken) {
    //     HttpHeaders headers = new HttpHeaders();
    //     headers.set("Authorization", "Bearer " + jwtToken);
    //     return headers;
    // }
}
