package com.akshat.esd.mini.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import com.akshat.esd.mini.Mapper.StudentMapper;
import com.akshat.esd.mini.Repo.StudentRepo;
import com.akshat.esd.mini.Repo.DomainRepo;
import com.akshat.esd.mini.Repo.SpecializationRepo;
import com.akshat.esd.mini.dto.StudentDTO;
import com.akshat.esd.mini.entity.Student;
import com.akshat.esd.mini.entity.specialization;
import com.akshat.esd.mini.entity.Domain;

@Service
@RequiredArgsConstructor
public class StudentServices {
    private final StudentRepo studentRepository;
    private final DomainRepo domainRepository;
    private final SpecializationRepo specializationRepository;
    private final StudentMapper studentMapper;

    public List<StudentDTO> getAllStudents() {
        List<Student> students = studentRepository.findAll();

        return students.stream().map(student -> {
            Domain domain = domainRepository.findById(student.getDomain())
                    .orElseThrow(() -> new RuntimeException("Domain not found"));
            specialization specialization = specializationRepository.findById(student.getSpecialization())
                    .orElseThrow(() -> new RuntimeException("Specialization not found"));
            return studentMapper.toDTO(student, domain, specialization);
        }).collect(Collectors.toList());
    }
}
