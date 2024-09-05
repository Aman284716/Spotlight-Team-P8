package com.example.Orders.service;

import com.example.Orders.dto.CustomerDTO;
import com.example.Orders.dto.EnrichedOrderDTO;
import com.example.Orders.dto.ProductDTO;
import com.example.Orders.dto.VendorOrderDTO;
import com.example.Orders.model.Orders;
import com.example.Orders.repository.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrdersEnrichmentService {

    @Autowired
    private OrdersService ordersService;

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private WebClient.Builder webClientBuilder;

    private static final String PRODUCT_SERVICE_URL = "http://localhost:8083/products/";
    private static final String CUSTOMER_SERVICE_URL = "http://localhost:8081/customers/";

    public Mono<EnrichedOrderDTO> getEnrichedOrderById(Integer orderId) {
        WebClient webClient = webClientBuilder.build();

        return ordersService.getOrderById(orderId)
                .flatMap(order -> {
                    List<Mono<EnrichedOrderDTO.EnrichedOrderItemDTO>> itemDetailMonos = order.getItems().stream()
                            .map(item -> fetchProductDetails(webClient, item.getProductId())
                                    .map(product -> mapToEnrichedOrderItemDTO(product, item)))
                            .collect(Collectors.toList());

                    return Mono.zip(itemDetailMonos, results -> {
                        List<EnrichedOrderDTO.EnrichedOrderItemDTO> items = List.of(results)
                                .stream()
                                .map(o -> (EnrichedOrderDTO.EnrichedOrderItemDTO) o)
                                .collect(Collectors.toList());

                        EnrichedOrderDTO enrichedOrderDTO = new EnrichedOrderDTO();
                        enrichedOrderDTO.setId(order.getId());
                        enrichedOrderDTO.setOrderDate(order.getOrderDate().toString().split("T")[0]);
                        enrichedOrderDTO.setTotalAmount(order.getTotalAmount());
                        enrichedOrderDTO.setShippingAddress(order.getShippingAddress());
                        enrichedOrderDTO.setItems(items);
                        return enrichedOrderDTO;
                    });
                });
    }


    public Flux<VendorOrderDTO> getOrdersByVendorId(Integer vendorId) {
        WebClient webClient = webClientBuilder.build();

        return ordersRepository.findAll()
//                .doOnNext(order -> System.out.println("Found Order: " + order)) // Log orders
                .filter(order -> order.getItems().stream()
                        .anyMatch(item -> item.getVendorId().equals(vendorId)))
//                .doOnNext(order -> System.out.println("Filtered Order: " + order)) // Log filtered orders
                .flatMap(order -> {
                    // Fetch customer name
                    Mono<String> customerNameMono = fetchCustomerName(webClient, order.getCustomerId());

                    // Fetch product details and map to DTO
                    List<Mono<VendorOrderDTO.VendorOrderItemDTO>> itemDetailMonos = order.getItems().stream()
                            .filter(item -> item.getVendorId().equals(vendorId))
                            .map(item -> fetchProductDetails(webClient, item.getProductId())
//                                    .doOnNext(product -> System.out.println("Fetched Product: " + product)) // Log products
                                    .map(product -> mapToVendorOrderItemDTO(product, item)))
                            .collect(Collectors.toList());

                    // Collect item details into a list
                    Mono<List<VendorOrderDTO.VendorOrderItemDTO>> itemsMono = Mono.zip(itemDetailMonos, results -> {
                        return List.of(results)
                                .stream()
                                .map(o -> (VendorOrderDTO.VendorOrderItemDTO) o)
                                .collect(Collectors.toList());
                    });

                    // Create VendorOrderDTO from fetched data
                    return Mono.zip(customerNameMono, itemsMono, (customerName, items) -> {
                        VendorOrderDTO vendorOrderDTO = new VendorOrderDTO();
                        vendorOrderDTO.setId(order.getId());
                        vendorOrderDTO.setCustomerName(customerName);
                        vendorOrderDTO.setOrderDate(order.getOrderDate().toString().split("T")[0]);
                        vendorOrderDTO.setShippingAddress(order.getShippingAddress());
                        vendorOrderDTO.setItems(items);
                        return vendorOrderDTO;
                    });
                })
//                .doOnNext(vendorOrderDTO -> System.out.println("Created VendorOrderDTO: " + vendorOrderDTO)) // Log final DTO
                .collectList()
//                .doOnNext(vendorOrderDTOs -> System.out.println("VendorOrderDTOs List: " + vendorOrderDTOs)) // Log collected DTOs
                .flatMapMany(Flux::fromIterable);
    }


    private Mono<String> fetchCustomerName(WebClient webClient, Integer customerId) {
        return webClient.get()
                .uri(CUSTOMER_SERVICE_URL + customerId)
                .retrieve()
                .bodyToMono(CustomerDTO.class)
                .map(CustomerDTO::getUsername); // Adjust based on actual CustomerDTO structure
    }

    private Mono<ProductDTO> fetchProductDetails(WebClient webClient, Integer productId) {
        return webClient.get()
                .uri(PRODUCT_SERVICE_URL + productId)
                .retrieve()
                .bodyToMono(ProductDTO.class);
    }

    private VendorOrderDTO.VendorOrderItemDTO mapToVendorOrderItemDTO(ProductDTO product, Orders.OrderItem item) {
        VendorOrderDTO.VendorOrderItemDTO dto = new VendorOrderDTO.VendorOrderItemDTO();
        dto.setProductName(product.getProductName());
        dto.setProductImageUrl(product.getProductImageUrl());
        dto.setQuantity(item.getQuantity());
        return dto;
    }


    private EnrichedOrderDTO.EnrichedOrderItemDTO mapToEnrichedOrderItemDTO(ProductDTO product, Orders.OrderItem item) {
        EnrichedOrderDTO.EnrichedOrderItemDTO dto = new EnrichedOrderDTO.EnrichedOrderItemDTO();
        dto.setProductName(product.getProductName());
        dto.setDescription(product.getDescription());
        dto.setProductImageUrl(product.getProductImageUrl());
        dto.setQuantity(item.getQuantity());
        dto.setPrice(item.getPrice());
        return dto;
    }

}
