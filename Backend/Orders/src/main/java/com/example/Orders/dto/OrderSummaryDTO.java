package com.example.Orders.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Setter
@Getter
public class OrderSummaryDTO {
    // Getters and setters
    private Integer id;
    private String orderDate;
    private Double totalAmount;

}
