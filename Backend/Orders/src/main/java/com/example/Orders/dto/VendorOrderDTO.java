package com.example.Orders.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class VendorOrderDTO {
    private Integer id;
    private String customerName;
    private String orderDate;
    private String shippingAddress;
    private List<VendorOrderItemDTO> items;

    @Setter
    @Getter
    public static class VendorOrderItemDTO {
        private String productName;
        private String productImageUrl;
        private Integer quantity;
    }
}
