package com.ComapnyUser.UserDetails.User.Details.model;


public class LoginResponse {
    private Long id;
    private String message;

    public LoginResponse(String message) {
        this.message = message;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
