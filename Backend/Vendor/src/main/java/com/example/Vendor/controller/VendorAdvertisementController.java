package com.example.Vendor.controller;

import com.example.Vendor.model.VendorAdvertisement;
import com.example.Vendor.service.VendorAdvertisementService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/advertisements")
@RequiredArgsConstructor
@CrossOrigin
public class VendorAdvertisementController {

    private final VendorAdvertisementService service;

    @PostMapping
    public Mono<VendorAdvertisement> createAdvertisement(@RequestBody VendorAdvertisement advertisement) {
        return service.createAdvertisement(advertisement);
    }

    @GetMapping
    public Flux<VendorAdvertisement> getAllAdvertisements() {
        return service.getAllAdvertisements();
    }

    @DeleteMapping("/{id}")
    public Mono<Void> deleteAdvertisement(@PathVariable Integer id) {
        return service.deleteAdvertisement(id);
    }
}
