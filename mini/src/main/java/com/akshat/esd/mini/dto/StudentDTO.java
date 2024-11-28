package com.akshat.esd.mini.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentDTO {
    private String rollNo;
    private String firstName;
    private String lastName;
    private String email;
    private DomainDTO domain;
    private SpecializationDTO specialization;
}
