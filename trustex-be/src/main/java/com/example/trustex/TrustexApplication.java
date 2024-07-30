package com.example.trustex;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.example.trustex.dao")
public class TrustexApplication {

	public static void main(String[] args) {
		SpringApplication.run(TrustexApplication.class, args);
	}
//d
//d
	//
}
