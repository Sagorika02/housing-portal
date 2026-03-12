package com.example.marketapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class MarketAnalysisApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(MarketAnalysisApiApplication.class, args);
	}
}
