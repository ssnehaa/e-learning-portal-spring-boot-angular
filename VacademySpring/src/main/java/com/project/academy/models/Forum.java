package com.project.academy.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
<<<<<<< HEAD
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
=======
>>>>>>> 2e9c805fc8ca8c59496db8c5dd8be397305068a6
import javax.persistence.Table;

@Entity
@Table(	name = "forum")
public class Forum {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long f_id;

	private String courseName;
	
	private String username;
	
	private String comment;
	
	@ManyToOne
	private Student student;

	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	public Forum() {
	}
	
	public Forum(String courseName, String username, String comment, Student student) {
		this.courseName = courseName;
		this.username = username;
		this.comment = comment;
		this.student = student;
	}

	public Long getF_id() {
		return f_id;
	}

	public void setF_id(Long f_id) {
		this.f_id = f_id;
	}

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

}
