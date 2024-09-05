package com.example.Orders.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Setter
@Getter
public class EnrichedOrderDTO {
    // Getters and setters
    private Integer id;
    private String orderDate;
    private Double totalAmount;
    private String shippingAddress;
    private List<EnrichedOrderItemDTO> items;

    @Setter
    @Getter
    public static class EnrichedOrderItemDTO {
        // Getters and setters
        private String productName;
        private String description;
        private String productImageUrl;
        private Integer quantity;
        private BigDecimal price;
    }
}
