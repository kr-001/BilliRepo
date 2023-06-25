package com.ComapnyUser.UserDetails.User.Details.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ComapnyUser.UserDetails.User.Details.model.User;
import com.ComapnyUser.UserDetails.User.Details.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {
          String email = user.getEmail();

            // Check if user with the same email already exists
        if (userService.existsByEmail(email)) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        // Proceed with user creation
        User createdUser = userService.createUser(user);
        return ResponseEntity.ok(createdUser);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        User existingUser = userService.getUserById(id);
        if (existingUser == null) {
            return null; // Handle the case where the user with the given ID doesn't exist
        }

        // Update the user object with the new values
        existingUser.setFullName(user.getFullName());
        existingUser.setLocation(user.getLocation());
        existingUser.setEmail(user.getEmail());
        existingUser.setMobile(user.getMobile());
        existingUser.setPassword(user.getPassword());

        // Save the updated user
        return userService.updateUser(existingUser);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
    
}
