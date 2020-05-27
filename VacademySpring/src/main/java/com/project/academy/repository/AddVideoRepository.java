package com.project.academy.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.project.academy.models.StudentCourse;
import com.project.academy.models.VideoModel;

@Transactional
public interface AddVideoRepository extends JpaRepository<VideoModel, Long>{	
	
	//List<VideoModel> findByCourseName(String courseName);
	
	Boolean existsByCourseName(String courseName);
	List<VideoModel> findByCourseName(String courseName);
	Boolean existsById(long id);
	Optional<VideoModel> findById(long id);
	//Boolean existsByStudentIdAndCourseId(long studentId, long courseId);

}
