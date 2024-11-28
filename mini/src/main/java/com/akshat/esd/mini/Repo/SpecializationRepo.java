package com.akshat.esd.mini.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.akshat.esd.mini.entity.specialization;

@Repository
public interface SpecializationRepo extends JpaRepository<specialization, Long> {

}
