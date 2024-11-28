package com.akshat.esd.mini.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DomainDTO {
    private String program;
    private String batch;
    private String qualification;
}
