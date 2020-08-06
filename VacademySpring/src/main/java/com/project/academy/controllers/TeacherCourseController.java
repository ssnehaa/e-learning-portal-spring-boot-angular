package com.project.academy.controllers;

import java.util.List;
import java.util.Optional;

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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.academy.models.Course;
import com.project.academy.models.Student;
import com.project.academy.payload.response.MessageResponse;
import com.project.academy.repository.CourseRepository;
import com.project.academy.request.AddCourseRequest;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class TeacherCourseController {
	
	@Autowired
	CourseRepository courseRepository;
	
	@PostMapping("/addCourse")
	public ResponseEntity<?> registerCourse(@Valid @RequestBody AddCourseRequest addCourseRequest) {
		if (courseRepository.existsByCourseNameAndSclass(addCourseRequest.getCourseName(), addCourseRequest.getSclass())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Course for this class exists!"));
		}
		Course student = new Course(addCourseRequest.getCourseName(), 
				addCourseRequest.getSclass(),
				addCourseRequest.getCategory(),
				addCourseRequest.getTeacherId(),
				addCourseRequest.getTeacherName(),
				addCourseRequest.getImageUrl());


		courseRepository.save(student);

		return ResponseEntity.ok(new MessageResponse("Course added successfully!"));
	}
	
	@GetMapping(path="/allCourses")
	  public @ResponseBody Iterable<Course> getAllCourses() {		
	    return courseRepository.findAll();
	  }
	
	@GetMapping(path="/courseById/{id}")
	  public Optional<Course> getCourseById(@PathVariable("id") long id) {
		return (courseRepository.findById(id));
	  }
	
	@GetMapping(path="/courseByTeacherId/{id}")
	  public List<Course> getCourseByTeacherId(@PathVariable("id") long teacherId) {
		if(courseRepository.existsByTeacherId(teacherId)) {
		List<Course> cr = courseRepository.findByTeacherId(teacherId);
		
		return cr;
		}
		else
			return null;
	  }

}
