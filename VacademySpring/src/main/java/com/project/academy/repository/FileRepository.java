package com.project.academy.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.project.academy.models.FileModel;


@Transactional
public interface FileRepository extends JpaRepository<FileModel, Long>{	
	
	List<FileModel> findByCourseName(String courseName);
}