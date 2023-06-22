package com.ComapnyUser.UserDetails.User.Details.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ComapnyUser.UserDetails.User.Details.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    // Additional custom queries can be defined here if needed
    User findByEmail(String email);
}