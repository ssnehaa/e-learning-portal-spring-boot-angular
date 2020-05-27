package com.project.academy.payload.response;

public class MessageResponse {
	private String message;

	public MessageResponse(String message) {
	    this.message = message;
	    System.out.println(message);
	  }

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
