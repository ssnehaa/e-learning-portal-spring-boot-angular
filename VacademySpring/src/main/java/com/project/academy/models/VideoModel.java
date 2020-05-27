package com.project.academy.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="video_model")
public class VideoModel {
	
	@Id
	@GeneratedValue
    @Column(name = "id")
	private Long id;
	
	private String courseName;
	
	private String CourseUrl;
	
	private String PosterImage;
	
	private String name;
	
	private String description;

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public VideoModel() {}

	public VideoModel(String courseName, String CourseUrl, String PosterImage, String name, String description) {
		this.courseName = courseName;
		this.CourseUrl = CourseUrl;
		this.PosterImage = PosterImage;
		this.name = name;
		this.description = description;
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
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
