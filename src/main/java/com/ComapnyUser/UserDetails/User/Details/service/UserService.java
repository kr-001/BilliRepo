package com.ComapnyUser.UserDetails.User.Details.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.ComapnyUser.UserDetails.User.Details.model.User;
import com.ComapnyUser.UserDetails.User.Details.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }
     public User getUserByEmail(String email) {
    return userRepository.findByEmail(email);
  }
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public User updateUser(User userData) {
        User existingUser = userRepository.findById(userData.getId()).orElse(null);
        if (existingUser == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

        existingUser.setFullName(userData.getFullName());
        existingUser.setLocation(userData.getLocation());
        existingUser.setEmail(userData.getEmail());
        existingUser.setMobile(userData.getMobile());
        existingUser.setPassword(userData.getPassword());

        return userRepository.save(existingUser);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
