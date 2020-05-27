package com.project.academy.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.project.academy.models.StudentAssng;


@Transactional
public interface StudentAssngRepository extends JpaRepository<StudentAssng, Long>{	
	
	List<StudentAssng> findByCourseName(String courseName);
	List<StudentAssng> findByCourseNameAndUsername(String courseName, String username);
}