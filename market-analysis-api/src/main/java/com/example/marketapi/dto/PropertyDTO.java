package com.example.marketapi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PropertyDTO {

    @JsonProperty("square_footage")
    private int squareFootage;

    private int bedrooms;
    private int bathrooms;

    @JsonProperty("year_built")
    private int yearBuilt;

    @JsonProperty("lot_size")
    private int lotSize;

    @JsonProperty("distance_to_city_center")
    private double distanceToCityCenter;

    @JsonProperty("school_rating")
    private double schoolRating;

    // Getters & Setters
    public int getSquareFootage() { return squareFootage; }
    public void setSquareFootage(int squareFootage) { this.squareFootage = squareFootage; }

    public int getBedrooms() { return bedrooms; }
    public void setBedrooms(int bedrooms) { this.bedrooms = bedrooms; }

    public int getBathrooms() { return bathrooms; }
    public void setBathrooms(int bathrooms) { this.bathrooms = bathrooms; }

    public int getYearBuilt() { return yearBuilt; }
    public void setYearBuilt(int yearBuilt) { this.yearBuilt = yearBuilt; }

    public int getLotSize() { return lotSize; }
    public void setLotSize(int lotSize) { this.lotSize = lotSize; }

    public double getDistanceToCityCenter() { return distanceToCityCenter; }
    public void setDistanceToCityCenter(double distanceToCityCenter) { this.distanceToCityCenter = distanceToCityCenter; }

    public double getSchoolRating() { return schoolRating; }
    public void setSchoolRating(double schoolRating) { this.schoolRating = schoolRating; }
}