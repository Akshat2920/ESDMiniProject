package com.akshat.esd.mini.Mapper;

import org.springframework.stereotype.Component;

import com.akshat.esd.mini.dto.DomainDTO;
import com.akshat.esd.mini.dto.SpecializationDTO;
import com.akshat.esd.mini.dto.StudentDTO;
import com.akshat.esd.mini.entity.Student;
import com.akshat.esd.mini.entity.Domain;
import com.akshat.esd.mini.entity.specialization;

@Component
public class StudentMapper {

    public StudentDTO toDTO(Student student, Domain domain, specialization specialization) {
        return StudentDTO.builder()
                .rollNo(student.getRollNo())
                .firstName(student.getFirstName())
                .lastName(student.getLastName())
                .email(student.getEmail())
                .domain(DomainDTO.builder()
                        .program(domain.getProgram())
                        .batch(domain.getBatch())
                        .qualification(domain.getQualification())
                        .build())
                .specialization(SpecializationDTO.builder()
                        .code(specialization.getCode())
                        .name(specialization.getName())
                        .build())
                .build();
    }
}
