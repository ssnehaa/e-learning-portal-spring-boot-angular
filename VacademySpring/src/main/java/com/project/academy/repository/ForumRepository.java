package com.project.academy.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.academy.models.Forum;

@Repository
public interface ForumRepository extends JpaRepository<Forum, Long> {
	
	Boolean existsByCourseName(String courseName);
	List<Forum> findByCourseName(String courseName);

}
