package com.project.academy.request;

import org.springframework.web.multipart.MultipartFile;

public class UploadImageRequest {
	
	public MultipartFile file;
	public long userId;
	public MultipartFile getFile() {
		return file;
	}
	public void setFile(MultipartFile file) {
		this.file = file;
	}
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}

}
