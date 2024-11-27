package com.akshat.esd.mini.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import jakarta.validation.Valid;
import com.akshat.esd.mini.services.AdminServices;
import com.akshat.esd.mini.dto.AdminLogin;
import com.akshat.esd.mini.helper.JWTHelper;    

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {
    private final AdminServices adminServices;
    @Autowired
    private JWTHelper jwtHelper;

    public AuthenticationController(AdminServices adminServices, JWTHelper jwtHelper) {
        this.adminServices = adminServices;
        this.jwtHelper = jwtHelper;
    }
   
    @PostMapping("/login")
    public ResponseEntity<String> loginAdmin(@RequestBody @Valid AdminLogin adminLogin) {
        return ResponseEntity.ok(adminServices.loginAdmin(adminLogin));
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authorizationHeader) {
        //System.out.println(authorizationHeader);
        String token = null;
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            token = authorizationHeader.substring(7); // Remove "Bearer " from the token
        }

        if (token == null || token.isEmpty()) {
            return ResponseEntity.status(401).body("Token is missing");
        }

        try {
            // Validate the token (you may need to extract the username from the token if necessary)
            String username = jwtHelper.extractUsername(token);
            boolean isValid = jwtHelper.validateToken(token, username);

            if (isValid) {
                return ResponseEntity.ok().body("Token is valid");
            } else {
                return ResponseEntity.status(401).body("Invalid token");
            }
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid token");
        }
    }
    

}
