package com.akshat.esd.mini.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;

public record AdminRequest(
    @JsonProperty("id") 
    @NotNull(message = "Admin ID cannot be null") 
    Long id,

    @JsonProperty("fullName") 
    @NotBlank(message = "Full name cannot be null or blank") 
    String fullName,

    @JsonProperty("email") 
    @NotBlank(message = "Email cannot be null or blank") 
    @Email(message = "Invalid email format")
    String email,

    @JsonProperty("password") 
    @NotBlank(message = "Password cannot be null or blank") 
    String password
) {}

