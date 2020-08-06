package com.project.academy.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.academy.models.StudentCourse;
import com.project.academy.payload.response.MessageResponse;
import com.project.academy.repository.CourseRepository;
import com.project.academy.repository.StudentCourseRepository;
import com.project.academy.request.StudentCourseRequest;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class StudentCourseController {
	
	@Autowired
	StudentCourseRepository studentCourseRepository;
	@Autowired
	CourseRepository courseRepository;
	
	@GetMapping(path="/studentCourse/{id}")
	  public List<StudentCourse> getCourseByStudentId(@PathVariable("id") long studentId) {
		if(studentCourseRepository.existsByStudentId(studentId)) {
			List<StudentCourse> cr = studentCourseRepository.findByStudentId(studentId);
			return cr;
		}
		else {
			return null;
		}
	  }
	
	@PostMapping("/addStudentCourse")
	public ResponseEntity<?> studentCourse(@Valid @RequestBody StudentCourseRequest studentCourseRequest) {
		if (studentCourseRepository.existsByStudentIdAndCourseId(studentCourseRequest.getStudentId(), studentCourseRequest.getCourseId())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: You are already registered to this course!"));
		}
	StudentCourse studentCourse = new StudentCourse(studentCourseRequest.getCourseId(),
				studentCourseRequest.getCourseName(), 
				studentCourseRequest.getStudentId(),
				studentCourseRequest.getStudentName(),
				courseRepository.findByCourseName(studentCourseRequest.getCourseName()).get().getImageUrl());


		studentCourseRepository.save(studentCourse);

		return ResponseEntity.ok(new MessageResponse("Course added successfully!"));
	}

}
