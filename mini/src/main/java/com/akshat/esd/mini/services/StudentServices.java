package com.akshat.esd.mini.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

//import static java.lang.String.format;
import com.akshat.esd.mini.Repo.StudentRepo;
import com.akshat.esd.mini.entity.Student;

@Service
@RequiredArgsConstructor
public class StudentServices {
    private final StudentRepo studentRepo;

    public List<Student> getAllStudents() {
        return studentRepo.findAllStudents();
    }
}
