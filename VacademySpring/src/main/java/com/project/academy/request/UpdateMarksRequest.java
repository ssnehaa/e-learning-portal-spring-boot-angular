package com.project.academy.request;

public class UpdateMarksRequest {
	
	public Long id;
	
	public int marks;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getMarks() {
		return marks;
	}

	public void setMarks(int marks) {
		this.marks = marks;
	}

}
