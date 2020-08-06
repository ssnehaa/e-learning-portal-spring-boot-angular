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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.academy.models.StudentCourse;
import com.project.academy.models.VideoModel;
import com.project.academy.payload.response.MessageResponse;
import com.project.academy.repository.AddVideoRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class CourseVideoController {
	
	@Autowired
	AddVideoRepository addVideoRepository;
	
	@PostMapping("/addVideo")
	public ResponseEntity<?> addVideo(@Valid @RequestParam("courseName") String courseName, @RequestParam("courseUrl") String courseUrl, @RequestParam("posterImage") String posterImage, @RequestParam("name") String name, @RequestParam("description") String description) {

		VideoModel student = new VideoModel(courseName, courseUrl, posterImage, name, description);

		addVideoRepository.save(student);

		return ResponseEntity.ok(new MessageResponse("Course added successfully!"));
	}
	
	@GetMapping(path="/lecture/{courseName}")
	  public List<VideoModel> getLectures(@Valid @PathVariable("courseName") String courseName) {
		if(addVideoRepository.existsByCourseName(courseName)) {
			List<VideoModel> list = addVideoRepository.findByCourseName(courseName);
			return list;
		}
		else {
			return null;
		}
	  }
	
	@GetMapping(path="/getCourseVideo/{id}")
	  public Optional<VideoModel> getVideoById(@PathVariable("id") long id) {
		if(addVideoRepository.existsById(id)) {
			Optional<VideoModel> cr = addVideoRepository.findById(id);
			return cr;
		}
		else {
			return null;
		}
	  }

}
