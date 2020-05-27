package com.project.academy.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.project.academy.models.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
	
	//Course findCourseById(Long id);
	
//	@Query("select c.courseName from courses c where id = courseId")
//	public Course getCourse(long courseId);
	
	//Optional<Course> findById(Long id);
	
//public interface CourseRepository extends JpaRepository<Course, Long> {
	Optional<Course> findByCourseName(String username);
	
	List<Course> findByTeacherId(long teacherId);
	Boolean existsByTeacherId(long teacherId);

	Boolean existsByCourseNameAndSclass(String courseName, int sclass);

	//Boolean existsByEmail(String email);
}
