package com.example.marketapi.controller;

import com.example.marketapi.dto.PropertyDTO;
import com.example.marketapi.service.MarketAnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/market")
@CrossOrigin(origins = "http://localhost:3000")
public class MarketAnalysisController {

    @Autowired
    private MarketAnalysisService analysisService;

    // Predict prices for a batch of properties
    @PostMapping("/predict")
    public Map<String, Object> predict(@RequestBody List<PropertyDTO> properties) {
        List<Double> predictions = analysisService.getPredictedPrices(properties);
        Map<String, Object> response = new HashMap<>();
        response.put("predicted_prices", predictions);
        return response;
    }

    // Generate aggregate statistics
    @PostMapping("/stats")
    public Map<String, Object> getStatistics(@RequestBody List<PropertyDTO> properties) {
        Map<String, Object> stats = new HashMap<>();
        int totalProperties = properties.size();
        double avgBedrooms = properties.stream().mapToInt(PropertyDTO::getBedrooms).average().orElse(0);
        double avgBathrooms = properties.stream().mapToInt(PropertyDTO::getBathrooms).average().orElse(0);
        double avgLotSize = properties.stream().mapToInt(PropertyDTO::getLotSize).average().orElse(0);
        stats.put("total_properties", totalProperties);
        stats.put("avg_bedrooms", avgBedrooms);
        stats.put("avg_bathrooms", avgBathrooms);
        stats.put("avg_lot_size", avgLotSize);
        return stats;
    }
}