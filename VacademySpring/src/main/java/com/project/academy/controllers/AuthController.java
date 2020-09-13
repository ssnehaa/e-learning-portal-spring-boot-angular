package com.project.academy.controllers;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
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

import com.project.academy.models.Student;
import com.project.academy.payload.response.JwtResponse;
import com.project.academy.payload.response.MessageResponse;
import com.project.academy.repository.StudentRepository;
import com.project.academy.request.SignInRequest;
import com.project.academy.request.SignUpRequest;
import com.project.academy.request.UpdateProfileRequest;
import com.project.academy.security.jwt.JwtUtils;
import com.project.academy.security.services.StudentDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
	@Autowired
	StudentRepository studentRepository;
	
	@Autowired
	PasswordEncoder encoder;
	
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	JwtUtils jwtUtils;
	
	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
		if (studentRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}

		if (studentRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}

		Student student = new Student(signUpRequest.getUsername(), 
							 signUpRequest.getEmail(),
							 encoder.encode(signUpRequest.getPassword()),
							 signUpRequest.getName(),
							 signUpRequest.getRole());


		studentRepository.save(student);

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
	
	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody SignInRequest signInRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(signInRequest.getUsername(), signInRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtTokenStudent(authentication);
		
		StudentDetailsImpl studentDetails = (StudentDetailsImpl) authentication.getPrincipal();
		
		return ResponseEntity.ok(new JwtResponse(jwt, 
				studentDetails.getId(), 
				studentDetails.getUsername(), 
				studentDetails.getEmail(),
				studentDetails.getName(),
				studentDetails.getRole(),
				studentDetails.getAbout(),
				studentDetails.getAddress()
				));
	}
	
	@PutMapping("/updateProfile")
	  public ResponseEntity<?> updateUser(@Valid @RequestBody UpdateProfileRequest updateRequest) {
	 
	    Optional<Student> userData = studentRepository.findById(updateRequest.getId());
	    Student student = userData.get();
	    
	    student.setName(updateRequest.getName());
	    student.setAddress(updateRequest.getAddress());
	    student.setEmail(updateRequest.getEmail());
	    student.setAbout(updateRequest.getAbout());
		studentRepository.save(student);
		
		return ResponseEntity.ok(student);
	  }
	
	@PutMapping("/updateAbout")
	public ResponseEntity<?> updateUserAbout(@RequestParam("id") long id, @RequestParam("about") String about) {
		System.out.println("ID : " + id);
		System.out.println("ABOUT : " + about);
		Optional<Student> userData = studentRepository.findById(id);
		Student student = userData.get();
		student.setAbout(about);
		studentRepository.save(student);
		
		return ResponseEntity.ok(student);
	}
	
	@PutMapping("/updateName")
	public ResponseEntity<?> updateUserName(@RequestParam("id") long id, @RequestParam("name") String name) {
		System.out.println("ID : " + id);
		System.out.println("ABOUT : " + name);
		Optional<Student> userData = studentRepository.findById(id);
		Student student = userData.get();
		student.setName(name);
		studentRepository.save(student);
		
		return ResponseEntity.ok(student);
	}
	
	@PutMapping("/updateEmail")
	public ResponseEntity<?> updateUserEmail(@RequestParam("id") long id, @RequestParam("email") String email) {
		System.out.println("ID : " + id);
		System.out.println("ABOUT : " + email);
		Optional<Student> userData = studentRepository.findById(id);
		Student student = userData.get();
		student.setEmail(email);
		studentRepository.save(student);
		
		return ResponseEntity.ok(student);
	}
	
	@PutMapping("/updateAddress")
	public ResponseEntity<?> updateUserAddress(@RequestParam("id") long id, @RequestParam("address") String address) {
		System.out.println("ID : " + id);
		System.out.println("ABOUT : " + address);
		Optional<Student> userData = studentRepository.findById(id);
		Student student = userData.get();
		student.setAddress(address);
		studentRepository.save(student);
		
		return ResponseEntity.ok(student);
	}
	
	@PostMapping("/upload")
    public BodyBuilder uplaodImage(@Valid @RequestParam("imageFile") MultipartFile file) throws IOException {
        System.out.println("Original Image Byte Size - " + file.getBytes().length);
        System.out.println("NAME : " + file.getOriginalFilename());
        
        Optional<Student> userData = studentRepository.findByName(file.getOriginalFilename());
        
        Student student = userData.get();
	    
	    student.setPicByte(compressBytes(file.getBytes()));
		studentRepository.save(student);
        return ResponseEntity.status(HttpStatus.OK);
    }
    
	@GetMapping("/getImage/{imageName}")
    public Student getImage(@Valid @PathVariable("imageName") String imageName) throws IOException {
    	System.out.println("IMAGENAME" + imageName);
    	System.out.println(imageName);
        final Optional<Student> retrievedImage = studentRepository.findByName(imageName);
        Student img = new Student(retrievedImage.get().getName(), decompressBytes(retrievedImage.get().getPicByte()));
        return img;
    }
    
    // compress the image bytes before storing it in the database
    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
        }
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);
        return outputStream.toByteArray();
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