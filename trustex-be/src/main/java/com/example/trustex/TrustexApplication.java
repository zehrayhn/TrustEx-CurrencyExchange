package com.example.trustex;

import com.example.trustex.entity.User;
import com.example.trustex.entity.UserType;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.example.trustex.dao")
public class TrustexApplication {

	public static void main(String[] args) {
//		User user = new User();
//		user.setIdNumber("1234567890");
//		user.setUserType(UserType.INDIVIDUAL);
//
//		System.out.println("Username: " + user.getUsername());
		SpringApplication.run(TrustexApplication.class, args);
	}
//d
//d
	//
}
