package com.example.Vendor.controller;

import com.example.Vendor.model.Vendor;
import com.example.Vendor.dto.VendorDTO;
import com.example.Vendor.service.VendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/vendors")
@CrossOrigin
public class VendorController {

    @Autowired
    private VendorService vendorService;

    @PostMapping
    public Mono<ResponseEntity<Vendor>> createVendor(@RequestBody Vendor vendor) {
        return vendorService.createVendor(vendor)
                .map(createdVendor -> ResponseEntity.status(HttpStatus.CREATED).body(createdVendor));
    }

    @GetMapping("/all") // New endpoint to get all vendors as Vendor objects
    public Flux<Vendor> getAllVendorsDirectly() {
        return vendorService.getAllVendorsDirectly();
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<VendorDTO>> getVendorById(@PathVariable Integer id) {
        return vendorService.getVendorById(id)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @GetMapping
    public Flux<VendorDTO> getAllVendors() {
        return vendorService.getAllVendors();
    }

    @PutMapping("/{id}")
    public Mono<ResponseEntity<VendorDTO>> updateVendor(@PathVariable Integer id, @RequestBody VendorDTO vendorDTO) {
        return vendorService.updateVendor(id, vendorDTO)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public Mono<Void> deleteVendor(@PathVariable Integer id) {
        return vendorService.deleteVendor(id);
    }

    @PostMapping("/{id}/reviews")
    public Mono<ResponseEntity<VendorDTO>> addReview(
            @PathVariable Integer id,
            @RequestBody VendorDTO.ReviewDTO reviewDTO) {
        return vendorService.addReview(id, reviewDTO)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
