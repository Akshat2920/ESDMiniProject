package com.akshat.esd.mini.Repo;

import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
import com.akshat.esd.mini.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
//import java.util.Optional;
public interface StudentRepo extends JpaRepository<Student, Long> {

    @Query("SELECT s FROM Student s")
    List<Student> findAllStudents();
}
