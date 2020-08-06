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

import com.project.academy.models.Forum;
import com.project.academy.payload.response.MessageResponse;
import com.project.academy.repository.ForumRepository;
import com.project.academy.request.ForumRequest;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class ForumController {
	
	@Autowired
	ForumRepository forumRepository;
	
	@PostMapping("/addComment")
	public ResponseEntity<?> addComment(@Valid @RequestBody ForumRequest addCourseRequest) {
		Forum forum = new Forum(addCourseRequest.getCourseName(), addCourseRequest.getUsername(), addCourseRequest.getComment());


		forumRepository.save(forum);

		return ResponseEntity.ok(new MessageResponse("Course added successfully!"));
	}
	
	@GetMapping(path="/getComment/{courseName}")
	  public List<Forum> getComment(@PathVariable("courseName") String courseName) {
		if(forumRepository.existsByCourseName(courseName)) {
			List<Forum> cr = forumRepository.findByCourseName(courseName);
			return cr;
		}
		else {
			return null;
		}
	  }

}
