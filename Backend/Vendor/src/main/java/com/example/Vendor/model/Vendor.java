    package com.example.Vendor.model;

    import lombok.Data;
    import lombok.NoArgsConstructor;
    import org.springframework.data.annotation.Id;
    import org.springframework.data.mongodb.core.mapping.Document;

    import java.util.ArrayList;
    import java.util.List;

    @Data
    @NoArgsConstructor
    @Document(collection = "vendors")
    public class Vendor {
        @Id
        private Integer id; // Auto-incremented ID
        private String name;
        private String contactEmail;
        private String passwordHash; // Retained for authentication purposes
        private String contactPhoneNumber;
        private String address;
        private String location;
        private String businessCategory;
        private String storeName;
        private String profileImageUrl;
        private List<Review> reviews = new ArrayList<>();

        @Data
        @NoArgsConstructor
        public static class Review {
            private Integer customerId; // Integer type for customer ID
            private Integer rating;
            private String comment;
            // Removed reviewDate
        }
    }
