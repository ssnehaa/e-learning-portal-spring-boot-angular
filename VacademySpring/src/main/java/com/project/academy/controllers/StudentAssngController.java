package com.project.academy.controllers;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonView;
import com.project.academy.models.StudentAssng;
import com.project.academy.repository.StudentAssngRepository;
import com.project.academy.repository.View;
import com.project.academy.request.UpdateMarksRequest;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class StudentAssngController {
	
	@Autowired
	StudentAssngRepository studentAssngRepository;
	
	@PostMapping("/file/uploadAssng")
    public String uploadAssng(@RequestParam("file") MultipartFile file, @RequestParam("courseName") String courseName, @RequestParam("username") String username) {
    	
    	try {
	    	StudentAssng filemode = new StudentAssng(file.getOriginalFilename(), file.getContentType(), file.getBytes(), courseName, username);
	    	studentAssngRepository.save(filemode);
	    	return "File uploaded successfully! -> filename = " + file.getOriginalFilename();
		} catch (	Exception e) {
			return "FAIL! Maybe You had uploaded the file before or the file's size > 500KB";
		}
    }
	
	@JsonView(View.FileInfo.class)
	@GetMapping("/file/allAssng")
	public List<StudentAssng> getListAssng() {
		return studentAssngRepository.findAll();
	}
    
    
	@PostMapping("/file/assng")
	public List<StudentAssng> getFilesAssng(@RequestParam("courseName") String courseName, @RequestParam("userName") String userName) {
    	List<StudentAssng> cr = studentAssngRepository.findByCourseNameAndUsername(courseName, userName);
		return cr;
	}
	
	@GetMapping("/file/assngTeacher/{courseName}")
	public List<StudentAssng> getFilesAssngTeacher(@PathVariable("courseName") String  courseName) {
    	List<StudentAssng> cr = studentAssngRepository.findByCourseName(courseName);
		return cr;
	}
	
	@GetMapping("/assng/{id}")
	public ResponseEntity<byte[]> getAssng(@PathVariable Long id) {
		Optional<StudentAssng> fileOptional = studentAssngRepository.findById(id);
		
		if(fileOptional.isPresent()) {
			StudentAssng file = fileOptional.get();
			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
					.body(file.getPic());	
		}
		
		return ResponseEntity.status(404).body(null);
	}
	
	@PutMapping("/updateMarks")
	  public ResponseEntity<?> updateMarks(@Valid @RequestBody UpdateMarksRequest updateRequest) {
	 
	    Optional<StudentAssng> userData = studentAssngRepository.findById(updateRequest.getId());
	    
	    StudentAssng student = userData.get();
	    
	    student.setMarks(updateRequest.getMarks());
		studentAssngRepository.save(student);
		
		return ResponseEntity.ok(student);

		//return ResponseEntity.ok(new MessageResponse("Updated successfully!"));
	  }

}
