package com.project.academy.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class UpdateProfileRequest {
	
	private long id;
 
    private String email;
    
    private String name;
    
    private String about;
    
    private String address;
    
    public String getAbout() {
		return about;
	}

	public void setAbout(String about) {
		this.about = about;
	}
    
    public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
  
    
}
