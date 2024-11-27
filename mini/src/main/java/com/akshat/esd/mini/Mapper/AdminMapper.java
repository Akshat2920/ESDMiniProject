package com.akshat.esd.mini.Mapper;

import com.akshat.esd.mini.dto.AdminLogin;
import com.akshat.esd.mini.entity.Admin;
import com.akshat.esd.mini.dto.AdminRequest;

public class AdminMapper {
    public static Admin toEntity(AdminRequest adminRequest) {
        return Admin.builder()
                .id(adminRequest.id())
                .fullName(adminRequest.fullName())
                .email(adminRequest.email())
                .password(adminRequest.password())
                .build();
    }

    public static AdminLogin toDto(Admin admin) {
        return new AdminLogin(
                admin.getEmail(),
                admin.getPassword()
        );
    }
}

