package com.project.academy.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonView;
import com.project.academy.repository.View;

@Entity
@Table(name="stud_assng")
public class StudentAssng {
	
		@Id
		@GeneratedValue
	    @Column(name = "id")
		@JsonView(View.FileInfo.class)
	    private Long id;
		
	    @Column(name = "name")
	    @JsonView(View.FileInfo.class)
		private String name;
	    
	    @Column(name = "mimetype")
		private String mimetype;
		
		@Lob
	    @Column(name="pic")
	    private byte[] pic;
		
		private String courseName;
		
		private String username;
		
		private int marks;
		
		public int getMarks() {
			return marks;
		}

		public void setMarks(int marks) {
			this.marks = marks;
		}

		public StudentAssng(){}
		
		public StudentAssng(String name, String mimetype, byte[] pic, String courseName, String username){
			this.name = name;
			this.mimetype = mimetype;
			this.pic = pic;
			this.courseName = courseName;
			this.username = username;
		}
		
		public String getUsername() {
			return username;
		}

		public void setUsername(String username) {
			this.username = username;
		}

		public String getCourseName() {
			return courseName;
		}

		public void setCourseName(String courseName) {
			this.courseName = courseName;
		}

		public Long getId(){
			return this.id;
		}
		
		public void setId(Long id){
			this.id = id;
		}
		
		public String getName(){
			return this.name;
		}
		
		public void setName(String name){
			this.name = name;
		}
		
		public String getMimetype(){
			return this.mimetype;
		}
		
		public void setMimetype(String mimetype){
			this.mimetype = mimetype;
		}
		
		public byte[] getPic(){
			return this.pic;
		}
		
		public void setPic(byte[] pic){
			this.pic = pic;
		}
	}