package com.example.Orders.controller;

import com.example.Orders.dto.EnrichedOrderDTO;
import com.example.Orders.dto.OrderSummaryDTO;
import com.example.Orders.dto.OrdersDTO;
import com.example.Orders.dto.VendorOrderDTO;
import com.example.Orders.model.Orders;
import com.example.Orders.service.OrdersEnrichmentService;
import com.example.Orders.service.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/orders")
@CrossOrigin
public class OrdersController {

    @Autowired
    private OrdersService ordersService;

    @Autowired
    private OrdersEnrichmentService ordersEnrichmentService;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd")
            .withZone(ZoneId.systemDefault());

//    @GetMapping("/customer/{customerId}")
//    public Flux<OrderSummaryDTO> getOrdersByCustomerId(@PathVariable Integer customerId) {
//        return ordersService.getOrdersByCustomerId(customerId)
//                .map(order -> {
//                    OrderSummaryDTO summaryDTO = new OrderSummaryDTO();
//                    summaryDTO.setId(order.getId());
//                    summaryDTO.setOrderDate(DATE_FORMATTER.format(order.getOrderDate()));
//                    summaryDTO.setTotalAmount(order.getTotalAmount());
//                    return summaryDTO;
//                });
//    }

    @GetMapping("/customer/{customerId}")
    public Flux<EnrichedOrderDTO> getEnrichedOrdersByCustomerId(@PathVariable Integer customerId) {
        return ordersService.getOrdersByCustomerId(customerId)
                .flatMap(order -> ordersEnrichmentService.getEnrichedOrderById(order.getId()))
                .collectList()
                .flatMapMany(Flux::fromIterable);
    }

    @GetMapping("/vendor/{vendorId}")
    public Flux<VendorOrderDTO> getOrdersByVendorId(@PathVariable Integer vendorId) {
        return ordersEnrichmentService.getOrdersByVendorId(vendorId);
    }

    @GetMapping("/{orderId}")
    public Mono<ResponseEntity<EnrichedOrderDTO>> getEnrichedOrderById(@PathVariable Integer orderId) {
        return ordersEnrichmentService.getEnrichedOrderById(orderId)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Mono<ResponseEntity<Void>> createOrder(@RequestBody OrdersDTO ordersDTO) {
        Orders order = mapToOrder(ordersDTO);

        // Split the order by vendor
        return ordersService.createSplitOrders(order)
                .collectList()
                .flatMap(savedOrders -> Mono.just(ResponseEntity.status(HttpStatus.CREATED).build()));
    }

    @PutMapping("/{id}")
    public Mono<ResponseEntity<OrdersDTO>> updateOrder(
            @PathVariable Integer id,
            @RequestBody OrdersDTO ordersDTO) {
        return ordersService.updateOrder(id, mapToOrder(ordersDTO))
                .map(updatedOrder -> ResponseEntity.ok(mapToOrdersDTO(updatedOrder)))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public Mono<Void> deleteOrder(@PathVariable Integer id) {
        return ordersService.deleteOrder(id);
    }

    // Mapping methods
    private Orders mapToOrder(OrdersDTO dto) {
        Orders order = new Orders();
        order.setId(dto.getId());
        order.setCustomerId(dto.getCustomerId());
        order.setOrderDate(dto.getOrderDate());
        order.setTotalAmount(dto.getTotalAmount());
        order.setShippingAddress(dto.getShippingAddress());
        order.setItems(dto.getItems() != null ? dto.getItems().stream()
                .map(itemDTO -> {
                    Orders.OrderItem item = new Orders.OrderItem();
                    item.setProductId(itemDTO.getProductId());
                    item.setQuantity(itemDTO.getQuantity());
                    item.setPrice(itemDTO.getPrice());
                    item.setVendorId(itemDTO.getVendorId());  // Set vendorId
                    return item;
                }).toList() : null);
        return order;
    }

    private OrdersDTO mapToOrdersDTO(Orders order) {
        OrdersDTO dto = new OrdersDTO();
        dto.setId(order.getId());
        dto.setCustomerId(order.getCustomerId());
        dto.setOrderDate(order.getOrderDate());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setShippingAddress(order.getShippingAddress());
        dto.setItems(order.getItems() != null ? order.getItems().stream()
                .map(item -> {
                    OrdersDTO.OrderItemDTO itemDTO = new OrdersDTO.OrderItemDTO();
                    itemDTO.setProductId(item.getProductId());
                    itemDTO.setQuantity(item.getQuantity());
                    itemDTO.setPrice(item.getPrice());
                    itemDTO.setVendorId(item.getVendorId());  // Set vendorId
                    return itemDTO;
                }).toList() : null);
        return dto;
    }
}
