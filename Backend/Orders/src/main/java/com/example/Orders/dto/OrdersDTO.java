package com.example.Orders.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
public class OrdersDTO {
    private Integer id;
    private Integer customerId;
    private LocalDate orderDate;
    private Double totalAmount;
    private String shippingAddress;
    private List<OrderItemDTO> items;

    @Data
    @NoArgsConstructor
    public static class OrderItemDTO {
        private Integer productId;
        private Integer quantity;
        private BigDecimal price;
        private Integer vendorId;
    }
}
