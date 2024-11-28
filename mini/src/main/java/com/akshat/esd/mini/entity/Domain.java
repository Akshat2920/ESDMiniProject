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
@Table(name = "domain")
public class Domain {
    @Id
    @Column(name = "domain_id")
    private Long domainId;

    @Column(name = "program")
    private String program;

    @Column(name = "batch")
    private String batch;

    @Column(name = "qualification")
    private String qualification;
}
