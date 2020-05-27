package com.project.academy.request;

public class AddVideoRequest {
	
private String courseName;
	
	private String CourseUrl;
	
	private String PosterImage;

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

	public String getCourseUrl() {
		return CourseUrl;
	}

	public void setCourseUrl(String courseUrl) {
		CourseUrl = courseUrl;
	}

	public String getPosterImage() {
		return PosterImage;
	}

	public void setPosterImage(String posterImage) {
		PosterImage = posterImage;
	}

}
