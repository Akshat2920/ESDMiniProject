package com.akshat.esd.mini.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.akshat.esd.mini.entity.Domain;
@Repository
public interface DomainRepo extends JpaRepository<Domain, Long> {

}
