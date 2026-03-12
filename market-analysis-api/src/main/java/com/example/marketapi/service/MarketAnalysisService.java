package com.example.marketapi.service;

import com.example.marketapi.dto.PropertyDTO;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

@Service
public class MarketAnalysisService {

    private final RestTemplate restTemplate;

    @Value("${ml.api.url}")
    private String mlApiUrl;

    @Value("classpath:housing_dataset.json")
    private Resource datasetResource;

    private List<PropertyDTO> dataset = new ArrayList<>();

    public MarketAnalysisService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @PostConstruct
    public void init() {
        try (InputStream is = datasetResource.getInputStream()) {
            ObjectMapper mapper = new ObjectMapper();
            dataset = mapper.readValue(is, new TypeReference<List<PropertyDTO>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("Failed to load dataset, statistics will be empty.");
        }
    }

    // Call ML API to get predictions
    @Cacheable(value = "predictions", key = "#properties.hashCode()")
    public List<Double> getPredictedPrices(List<PropertyDTO> properties) {

        String url = mlApiUrl + "/predict-batch";

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("houses", properties);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            return (List<Double>) response.getBody().get("predicted_prices");
        }

        throw new RuntimeException("ML service unavailable");
    }

    // Generate aggregate stats from dataset
    @Cacheable("statistics")
    public Map<String, Object> getMarketStatistics() {
        Map<String, Object> stats = new HashMap<>();
        int total = dataset.size();
        stats.put("total_properties", total);

        stats.put("avg_bedrooms", dataset.stream().mapToInt(PropertyDTO::getBedrooms).average().orElse(0));
        stats.put("avg_bathrooms", dataset.stream().mapToInt(PropertyDTO::getBathrooms).average().orElse(0));
        stats.put("avg_lot_size", dataset.stream().mapToInt(PropertyDTO::getLotSize).average().orElse(0));
        stats.put("avg_square_footage", dataset.stream().mapToInt(PropertyDTO::getSquareFootage).average().orElse(0));
        stats.put("avg_distance_to_city_center", dataset.stream().mapToDouble(PropertyDTO::getDistanceToCityCenter).average().orElse(0));
        stats.put("avg_school_rating", dataset.stream().mapToDouble(PropertyDTO::getSchoolRating).average().orElse(0));

        return stats;
    }
}