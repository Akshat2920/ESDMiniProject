package com.akshat.esd.mini.Controller;

import com.akshat.esd.mini.dto.AdminRequest;
import com.akshat.esd.mini.services.AdminServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.akshat.esd.mini.entity.Admin;
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admins")
public class AdminController {
    private final AdminServices adminServices;

    @PostMapping
    public ResponseEntity<Admin> createAdmin(@RequestBody AdminRequest adminRequest) {
        Admin newAdmin = adminServices.addNewAdmin(adminRequest);
        return ResponseEntity.ok(newAdmin);
    }

}
