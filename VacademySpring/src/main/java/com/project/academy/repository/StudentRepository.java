package com.project.academy.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.academy.models.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
	Optional<Student> findByUsername(String username);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);
	
	Optional<Student> findByName(String name);

    Boolean existsByName(String name);
}
