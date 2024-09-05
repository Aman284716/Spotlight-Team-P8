package com.example.Vendor.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class VendorDTO {
    private Integer id;
    private String name;
    private String contactEmail;
    private String location; // Ensure location is included
    private String contactPhoneNumber;
    private String address;
    private String businessCategory;
    private String storeName;
    private String profileImageUrl;
    private List<ReviewDTO> reviews = new ArrayList<>();

    @Data
    @NoArgsConstructor
    public static class ReviewDTO {
        private Integer customerId;
        private Integer rating;
        private String comment;
        // Removed reviewDate
    }
}
