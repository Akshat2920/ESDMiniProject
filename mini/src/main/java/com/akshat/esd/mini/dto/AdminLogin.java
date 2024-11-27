package com.akshat.esd.mini.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;

public record AdminLogin(
    @JsonProperty("email") 
    @NotBlank(message = "Email cannot be null or blank") 
    @Email(message = "Invalid email format")
    String Email,

    @JsonProperty("password") 
    @NotBlank(message = "Password cannot be null or blank") 
    @Size(min = 6, message = "Password must be at least 6 characters long")
    String password) {}
