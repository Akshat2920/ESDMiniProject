package com.akshat.esd.mini.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;

public record AdminLogin(
    @JsonProperty("email") 
    @NotBlank(message = "Email cannot be null or blank") 
    String Email,

    @JsonProperty("password") 
    @NotBlank(message = "Password cannot be null or blank") 
    String password) {}
