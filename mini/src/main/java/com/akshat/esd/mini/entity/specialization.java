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
@Table(name = "specialization")
public class specialization {
    @Id
    @Column(name = "specialization_id")
    private Long specializationId;

    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    @Column(name = "credits_required")
    private Long creditsRequired;
}
