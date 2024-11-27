package com.akshat.esd.mini.Controller;

//import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.akshat.esd.mini.services.StudentServices;
import com.akshat.esd.mini.entity.Student;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/allstudents")

public class StudentController {
    private final StudentServices studentServices;

    @GetMapping
    public List<Student> getAllStudents() {
        return studentServices.getAllStudents();
    }
}
