package com.ComapnyUser.UserDetails.User.Details.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ComapnyUser.UserDetails.User.Details.model.Location;

public interface LocationRepository extends JpaRepository<Location, Long> {
    @Query("SELECT l.city, l.state FROM Location l")
    List<Object[]> findAllCitiesAndStates();
}
