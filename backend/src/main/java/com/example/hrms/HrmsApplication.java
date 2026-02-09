package com.example.hrms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(
	    scanBasePackages = {
	        "com.example.hrms.controller",
	        "com.example.hrms.service",
	        "com.example.hrms.repository",
	        "com.example.hrms.entity"
	    }
	)
	public class HrmsApplication {

	    public static void main(String[] args) {
	        SpringApplication.run(HrmsApplication.class, args);
	    }
	}
