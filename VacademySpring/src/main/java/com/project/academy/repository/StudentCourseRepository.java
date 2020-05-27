package com.project.academy.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.academy.models.StudentCourse;

@Repository
public interface StudentCourseRepository extends JpaRepository<StudentCourse, Long> {
	
	Boolean existsByStudentId(long studentId);
	List<StudentCourse> findByStudentId(long studentId);
	Boolean existsByStudentIdAndCourseId(long studentId, long courseId);

}
