package com.project.academy.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.academy.models.Student;
import com.project.academy.repository.StudentRepository;


@Service
public class StudentDetailsServiceImpl implements UserDetailsService {
	@Autowired
	StudentRepository studentRepository;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Student student = studentRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

		return StudentDetailsImpl.build(student);
	}

}
