//package com.example.Orders.model;
//
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import org.springframework.data.annotation.Id;
//import org.springframework.data.mongodb.core.mapping.Document;
//
//import java.time.Instant;
//import java.util.List;
//
//@Data
//@NoArgsConstructor
//@Document(collection = "orders")
//public class Orders {
//    @Id
//    private Integer id;
//    private Integer customerId; // Reference to the customer
//    private Instant orderDate;
//    private Double totalAmount;
//    private String shippingAddress;
//    private List<OrderItem> items;
//
//    @Data
//    @NoArgsConstructor
//    public static class OrderItem {
//        private Integer productId; // Reference to the product
//        private Integer quantity;
//        private Double price;
//    }
//}

package com.example.Orders.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@Document(collection = "orders")
public class Orders {

    @Id
    private Integer id;  // MongoDB will use ObjectId if this is not set explicitly
    private Integer customerId;
    private LocalDate orderDate;
    private Double totalAmount;
    private String shippingAddress;
    private List<OrderItem> items;

    @Data
    public static class OrderItem {
        private Integer productId;
        private Integer quantity;
        private BigDecimal price;
        private Integer vendorId;  // Added field
    }
}
