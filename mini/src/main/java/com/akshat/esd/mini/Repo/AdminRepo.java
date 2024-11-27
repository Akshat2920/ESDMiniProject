package com.akshat.esd.mini.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.akshat.esd.mini.entity.Admin;
import java.util.Optional;

public interface AdminRepo extends JpaRepository<Admin, Long> {
    Optional<Admin> findByEmail(String email);
}



