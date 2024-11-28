package com.akshat.esd.mini.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
    
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SpecializationDTO {
    private String code;
    private String name;
}
