package com.akshat.esd.mini.Controller;

//import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.akshat.esd.mini.services.StudentServices;
import com.akshat.esd.mini.dto.StudentDTO;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/allstudents")

public class StudentController {
    private final StudentServices studentService;

    @GetMapping
    public ResponseEntity<List<StudentDTO>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }
}
