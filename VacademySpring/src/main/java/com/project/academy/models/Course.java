package com.project.academy.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(	name = "courses")
public class Course {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String courseName;
	
	private int sclass;
	
	private String category;
	
	private Long teacherId;
	
	private String teacherName;

	public Course() {
	}
	
	public Course(String courseName, int sclass, String category, Long teacherId, String teacherName) {
		this.courseName = courseName;
		this.sclass = sclass;
		this.category = category;
		this.teacherId = teacherId;
		this.teacherName = teacherName;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

	public int getSclass() {
		return sclass;
	}

	public void setSclass(int sclass) {
		this.sclass = sclass;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Long getTeacherId() {
		return teacherId;
	}

	public void setTeacherId(Long teacherId) {
		this.teacherId = teacherId;
	}

	public String getTeacherName() {
		return teacherName;
	}

	public void setTeacherName(String teacherName) {
		this.teacherName = teacherName;
	}
	
	
}
