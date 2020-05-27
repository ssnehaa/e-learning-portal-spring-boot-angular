package com.project.academy.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
	public ResponseEntity<?> registerForum(@Valid @RequestBody ForumRequest addCourseRequest) {

		// Create new user's account
		System.out.println("FORUMCOURSE : " + addCourseRequest.getCourseName());
		System.out.println("FORUMUSER : " + addCourseRequest.getUsername());
		System.out.println("COMMENT : " + addCourseRequest.getComment());
		Forum forum = new Forum(addCourseRequest.getCourseName(), addCourseRequest.getUsername(), addCourseRequest.getComment());


		forumRepository.save(forum);

		return ResponseEntity.ok(new MessageResponse("Course added successfully!"));
	}
	
	@PostMapping(path="/getComment")
	  public List<Forum> getCommentt(@RequestParam("courseName") String courseName) {
		System.out.println("CourseComment : " + courseName);
	    // This returns a JSON or XML with the users
		if(forumRepository.existsByCourseName(courseName)) {
			List<Forum> cr = forumRepository.findByCourseName(courseName);
			System.out.println(cr.size());
			return cr;
		}
		else {
			return null;
		}
	  }

}
