package com.example.Product.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class ProductDTO {
    private Integer id;
    private String productName;
    private String description;
    private BigDecimal price;
    private String category;
    private String productImageUrl;
    private VendorDTO vendor;
    private List<ReviewDTO> reviews = new ArrayList<>();

    @Data
    @NoArgsConstructor
    public static class ReviewDTO {
        private Integer customerId;
        private Integer rating;
        private String comment;
        // Removed reviewDate
    }

    @Data
    @NoArgsConstructor
    public static class VendorDTO {
        private Integer id;
        private String name;
    }
}
