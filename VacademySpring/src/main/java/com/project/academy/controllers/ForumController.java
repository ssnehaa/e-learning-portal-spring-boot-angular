package com.project.academy.controllers;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.zip.DataFormatException;
import java.util.zip.Inflater;

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
import com.project.academy.models.Student;
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
<<<<<<< HEAD
		Forum forum = new Forum(addCourseRequest.getCourseName(), addCourseRequest.getUsername(), addCourseRequest.getComment(), addCourseRequest.getStudent());
=======
		Forum forum = new Forum(addCourseRequest.getCourseName(), addCourseRequest.getUsername(), addCourseRequest.getComment());
>>>>>>> 2e9c805fc8ca8c59496db8c5dd8be397305068a6


		forumRepository.save(forum);

		return ResponseEntity.ok(new MessageResponse("Course added successfully!"));
	}
	
	@GetMapping(path="/getComment/{courseName}")
	  public List<Forum> getComment(@PathVariable("courseName") String courseName) {
		if(forumRepository.existsByCourseName(courseName)) {
			List<Forum> cr = forumRepository.findByCourseName(courseName);
<<<<<<< HEAD
			for(Forum f : cr) {
				if(f.getStudent().getPicByte() != null) {
					Student img = new Student(f.getStudent().getName(), decompressBytes(f.getStudent().getPicByte()));
					f.setStudent(img);
				}
			}
=======
>>>>>>> 2e9c805fc8ca8c59496db8c5dd8be397305068a6
			return cr;
		}
		else {
			return null;
		}
	  }
	
	// uncompress the image bytes before returning it to the angular application
    public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException ioe) {
        } catch (DataFormatException e) {
        }
        return outputStream.toByteArray();
    }

}
