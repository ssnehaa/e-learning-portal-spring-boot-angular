package com.project.academy.security.services;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.hibernate.validator.internal.util.privilegedactions.GetClassLoader;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.academy.models.Student;

public class StudentDetailsImpl implements UserDetails {
	private static final long serialVersionUID = 1L;

	private Long id;

	private String username;

	private String email;

	@JsonIgnore
	private String password;
	
	private String name;
	
	private String role;
	
	private String about;
	
	private String address;

	private Collection<? extends GrantedAuthority> authorities;

	public StudentDetailsImpl(Long id, String username, String email, String password, String name, String role, String about, String address) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.name = name;
		this.role = role;
		this.about = about;
		this.address = address;
	}

	public static StudentDetailsImpl build(Student student) {

		return new StudentDetailsImpl(
				student.getId(), 
				student.getUsername(), 
				student.getEmail(),
				student.getPassword(),
				student.getName(),
				student.getRole(),
				student.getAbout(),
				student.getAddress()
				);
	}

	public String getAbout() {
		return about;
	}

	public String getAddress() {
		return address;
	}

	public Long getId() {
		return id;
	}

	public String getEmail() {
		return email;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}
	
	public String getName() {
		return name;
	}
	
	public String getRole() {
		return role;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		StudentDetailsImpl student = (StudentDetailsImpl) o;
		return Objects.equals(id, student.id);
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return null;
	}
}
