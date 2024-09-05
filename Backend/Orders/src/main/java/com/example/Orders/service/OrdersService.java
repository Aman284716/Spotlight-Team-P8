//package com.example.Orders.service;
//
//import com.example.Orders.dto.OrdersDTO;
//import com.example.Orders.model.Orders;
//import com.example.Orders.repository.OrdersRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import reactor.core.publisher.Flux;
//import reactor.core.publisher.Mono;
//
//@Service
//public class OrdersService {
//
//    @Autowired
//    private OrdersRepository ordersRepository;
//
//    @Autowired
//    private SequenceService sequenceService;
//
//    public Mono<Orders> createOrder(Orders order) {
//        return sequenceService.getNextSequence("orders_sequence")
//                .map(seq -> {
//                    order.setId(seq);
//                    return order;
//                })
//                .flatMap(ordersRepository::save);
//    }
//
//    public Mono<Orders> getOrderById(Integer id) {
//        return ordersRepository.findById(id);
//    }
//
//    public Mono<Orders> updateOrder(Integer id, Orders order) {
//        order.setId(id);
//        return ordersRepository.save(order);
//    }
//
//    public Mono<Void> deleteOrder(Integer id) {
//        return ordersRepository.deleteById(id);
//    }
//
//    public Flux<Orders> getOrdersByCustomerId(Integer customerId) {
//        return ordersRepository.findByCustomerId(customerId);
//    }
//}

package com.example.Orders.service;

import com.example.Orders.model.Orders;
import com.example.Orders.repository.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class OrdersService {

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private SequenceService sequenceService;

    public Mono<Orders> createOrder(Orders order) {
        return sequenceService.getNextSequence("orders_sequence")
                .map(seq -> {
                    order.setId(seq);
                    return order;
                })
                .flatMap(ordersRepository::save);
    }

    public Flux<Orders> createSplitOrders(Orders order) {
        // Split items by vendorId without blocking
        return Flux.fromIterable(order.getItems())
                .groupBy(Orders.OrderItem::getVendorId)
                .flatMap(group ->
                        group.collectList()
                                .map(items -> {
                                    Orders vendorOrder = new Orders();
                                    vendorOrder.setCustomerId(order.getCustomerId());
                                    vendorOrder.setOrderDate(order.getOrderDate());
                                    vendorOrder.setShippingAddress(order.getShippingAddress());
                                    vendorOrder.setItems(items);
                                    return vendorOrder;
                                })
                                .flatMap(this::createOrder)
                );
    }

    public Mono<Orders> getOrderById(Integer id) {
        return ordersRepository.findById(id);
    }

    public Mono<Orders> updateOrder(Integer id, Orders order) {
        order.setId(id);
        return ordersRepository.save(order);
    }

    public Mono<Void> deleteOrder(Integer id) {
        return ordersRepository.deleteById(id);
    }

    public Flux<Orders> getOrdersByCustomerId(Integer customerId) {
        return ordersRepository.findByCustomerId(customerId);
    }


}
