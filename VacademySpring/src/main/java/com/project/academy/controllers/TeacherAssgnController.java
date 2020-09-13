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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonView;
import com.project.academy.models.FileModel;
import com.project.academy.repository.FileRepository;
import com.project.academy.repository.View;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class TeacherAssgnController {
	
	@Autowired
	FileRepository fileRepository;
	
	/*
     * MultipartFile Upload
     */
    @PostMapping("/file/upload")
    public String uploadMultipartFile(@RequestParam("file") MultipartFile file, @RequestParam("courseName") String courseName) {
    	try {
	    	FileModel filemode = new FileModel(file.getOriginalFilename(), file.getContentType(), file.getBytes(), courseName);
	    	fileRepository.save(filemode);
	    	return "File uploaded successfully! -> filename = " + file.getOriginalFilename();
		} catch (	Exception e) {
			return "FAIL! Maybe You had uploaded the file before or the file's size > 500KB";
		}    
    }
    
    /*
	 * List All Files
	 */
    @JsonView(View.FileInfo.class)
	@GetMapping("/file/all")
	public List<FileModel> getListFiles() {
		return fileRepository.findAll();
	}
    
    @PostMapping("/file/course")
	public List<FileModel> getFilesCourse(@RequestParam("courseName") String courseName) {
		return fileRepository.findByCourseName(courseName);
	}
    
    /*
     * Download Files
     */
	@GetMapping("/file/{id}")
	public ResponseEntity<byte[]> getFile(@PathVariable Long id) {
		Optional<FileModel> fileOptional = fileRepository.findById(id);
		
		if(fileOptional.isPresent()) {
			FileModel file = fileOptional.get();
			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
					.body(file.getPic());	
		}
		
		return ResponseEntity.status(404).body(null);
	}

}
