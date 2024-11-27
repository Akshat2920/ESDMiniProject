package com.akshat.esd.mini.services;

import com.akshat.esd.mini.Repo.AdminRepo;
import com.akshat.esd.mini.dto.AdminRequest;
import com.akshat.esd.mini.entity.Admin;
import com.akshat.esd.mini.Mapper.AdminMapper;
import com.akshat.esd.mini.dto.AdminLogin;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.akshat.esd.mini.helper.JWTHelper;

@Service
@RequiredArgsConstructor
public class AdminServices {
    private final AdminRepo adminRepo;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JWTHelper jwt;

    public Admin addNewAdmin(AdminRequest adminRequest) {
        Admin admin = AdminMapper.toEntity(adminRequest);
        admin.setPassword(bCryptPasswordEncoder.encode(admin.getPassword()));
        return adminRepo.save(admin);
    }

    public String loginAdmin(AdminLogin adminLogin) {
        Admin admin = adminRepo.findByEmail(adminLogin.Email()).orElseThrow(() -> new RuntimeException("Admin not found"));
        if (!bCryptPasswordEncoder.matches(adminLogin.password(), admin.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
        return jwt.generateToken(adminLogin.Email());
    }
}
