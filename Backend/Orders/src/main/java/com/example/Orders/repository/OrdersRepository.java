package com.example.Orders.repository;

import com.example.Orders.model.Orders;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface OrdersRepository extends ReactiveMongoRepository<Orders, Integer> {
    Flux<Orders> findByCustomerId(Integer customerId);
}
