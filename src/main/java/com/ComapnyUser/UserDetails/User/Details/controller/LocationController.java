package com.ComapnyUser.UserDetails.User.Details.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ComapnyUser.UserDetails.User.Details.model.Location;
import com.ComapnyUser.UserDetails.User.Details.repository.LocationRepository;

import java.util.List;

@RestController
@RequestMapping("/api")
public class LocationController {
    private final LocationRepository locationRepository;

    @Autowired
    public LocationController(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    @GetMapping("/locations")
    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }
}
