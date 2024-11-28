package com.akshat.esd.mini.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "students")

public class Student {
    @Id
    @Column(name = "student_id")
    private Long studentId;

    @Column(name = "roll_no", unique = true)
    private String rollNo;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "domain", nullable = false)
    private Long domain;

    @Column(name = "specialization", nullable = false)
    private Long specialization;
}
