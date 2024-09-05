package com.example.Product.repository;

import com.example.Product.model.Product;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;

public interface ProductRepository extends ReactiveMongoRepository<Product, Integer> {
    Flux<Product> findByVendorId(Integer vendorId);
    Flux<Product> findByCategory(String category);
}
