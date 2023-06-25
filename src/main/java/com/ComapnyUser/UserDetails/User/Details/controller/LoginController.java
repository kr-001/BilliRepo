package com.ComapnyUser.UserDetails.User.Details.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ComapnyUser.UserDetails.User.Details.model.LoginRequest;
import com.ComapnyUser.UserDetails.User.Details.model.LoginResponse;
import com.ComapnyUser.UserDetails.User.Details.model.User;
import com.ComapnyUser.UserDetails.User.Details.service.UserService;

@RestController
@RequestMapping("/api")
public class LoginController {

  private final UserService userService;

  public LoginController(UserService userService) {
    this.userService = userService;
  }
  @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
  // Retrieve the user from the database based on the provided email
  User user = userService.getUserByEmail(loginRequest.getEmail());

  if (user == null || !user.getPassword().equals(loginRequest.getPassword())) {
    // Invalid credentials, return appropriate response
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
  }

  // Authentication successful, generate JWT token or perform any other necessary operations
  // Return appropriate response, such as success message or token
  LoginResponse response = new LoginResponse("Authentication successful!");
  response.setId(user.getId());
  response.setMessage("Login successful!");
  return ResponseEntity.ok(response);
}

  
  // Other methods and endpoints
}
