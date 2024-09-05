package com.example.Vendor.service;

import com.example.Vendor.model.Vendor;
import com.example.Vendor.dto.VendorDTO;
import com.example.Vendor.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VendorService {

    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private SequenceService sequenceService;

    // POST method uses Vendor model
    public Mono<Vendor> createVendor(Vendor vendor) {
        return sequenceService.getNextSequence("vendor_seq")
                .map(seq -> {
                    vendor.setId(seq);
                    return vendor;
                })
                .flatMap(vendorRepository::save);
    }

    public Mono<VendorDTO> getVendorById(Integer id) {
        return vendorRepository.findById(id)
                .map(this::convertToDTO);
    }

    public Flux<VendorDTO> getAllVendors() {
        return vendorRepository.findAll()
                .map(this::convertToDTO);
    }

    public Mono<VendorDTO> updateVendor(Integer id, VendorDTO vendorDTO) {
        return vendorRepository.findById(id)
                .flatMap(existingVendor -> {
                    // Update only provided fields
                    existingVendor.setName(vendorDTO.getName() != null ? vendorDTO.getName() : existingVendor.getName());
                    existingVendor.setContactEmail(vendorDTO.getContactEmail() != null ? vendorDTO.getContactEmail() : existingVendor.getContactEmail());
                    existingVendor.setContactPhoneNumber(vendorDTO.getContactPhoneNumber() != null ? vendorDTO.getContactPhoneNumber() : existingVendor.getContactPhoneNumber());
                    existingVendor.setAddress(vendorDTO.getAddress() != null ? vendorDTO.getAddress() : existingVendor.getAddress());
                    existingVendor.setLocation(vendorDTO.getLocation() != null ? vendorDTO.getLocation() : existingVendor.getLocation());
                    existingVendor.setBusinessCategory(vendorDTO.getBusinessCategory() != null ? vendorDTO.getBusinessCategory() : existingVendor.getBusinessCategory());
                    existingVendor.setStoreName(vendorDTO.getStoreName() != null ? vendorDTO.getStoreName() : existingVendor.getStoreName());
                    existingVendor.setProfileImageUrl(vendorDTO.getProfileImageUrl() != null ? vendorDTO.getProfileImageUrl() : existingVendor.getProfileImageUrl());
                    // Keep existing reviews and passwordHash
                    // Save and return the updated vendor
                    return vendorRepository.save(existingVendor);
                })
                .map(this::convertToDTO);
    }

    public Mono<Void> deleteVendor(Integer id) {
        return vendorRepository.deleteById(id);
    }

    public Mono<VendorDTO> addReview(Integer vendorId, VendorDTO.ReviewDTO reviewDTO) {
        return vendorRepository.findById(vendorId)
                .flatMap(vendor -> {
                    Vendor.Review review = convertToEntityReview(reviewDTO);
                    vendor.getReviews().add(review);
                    return vendorRepository.save(vendor);
                })
                .map(this::convertToDTO);
    }

    private Vendor convertToEntity(VendorDTO vendorDTO) {
        Vendor vendor = new Vendor();
        vendor.setId(vendorDTO.getId());
        vendor.setName(vendorDTO.getName());
        vendor.setContactEmail(vendorDTO.getContactEmail());
        vendor.setContactPhoneNumber(vendorDTO.getContactPhoneNumber());
        vendor.setAddress(vendorDTO.getAddress());
        vendor.setLocation(vendorDTO.getLocation());
        vendor.setBusinessCategory(vendorDTO.getBusinessCategory());
        vendor.setStoreName(vendorDTO.getStoreName());
        vendor.setProfileImageUrl(vendorDTO.getProfileImageUrl());
        vendor.setReviews(convertToEntityReviews(vendorDTO.getReviews()));
        return vendor;
    }

    private VendorDTO convertToDTO(Vendor vendor) {
        VendorDTO vendorDTO = new VendorDTO();
        vendorDTO.setId(vendor.getId());
        vendorDTO.setName(vendor.getName());
        vendorDTO.setContactEmail(vendor.getContactEmail());
        vendorDTO.setContactPhoneNumber(vendor.getContactPhoneNumber());
        vendorDTO.setAddress(vendor.getAddress());
        vendorDTO.setLocation(vendor.getLocation());
        vendorDTO.setBusinessCategory(vendor.getBusinessCategory());
        vendorDTO.setStoreName(vendor.getStoreName());
        vendorDTO.setProfileImageUrl(vendor.getProfileImageUrl());
        vendorDTO.setReviews(convertToDTOReviews(vendor.getReviews()));
        return vendorDTO;
    }

    private Vendor.Review convertToEntityReview(VendorDTO.ReviewDTO reviewDTO) {
        Vendor.Review review = new Vendor.Review();
        review.setCustomerId(reviewDTO.getCustomerId());
        review.setRating(reviewDTO.getRating());
        review.setComment(reviewDTO.getComment());
        return review;
    }

    private List<Vendor.Review> convertToEntityReviews(List<VendorDTO.ReviewDTO> reviewDTOs) {
        return reviewDTOs.stream()
                .map(this::convertToEntityReview)
                .collect(Collectors.toList());
    }

    private List<VendorDTO.ReviewDTO> convertToDTOReviews(List<Vendor.Review> reviews) {
        return reviews.stream()
                .map(review -> {
                    VendorDTO.ReviewDTO reviewDTO = new VendorDTO.ReviewDTO();
                    reviewDTO.setCustomerId(review.getCustomerId());
                    reviewDTO.setRating(review.getRating());
                    reviewDTO.setComment(review.getComment());
                    return reviewDTO;
                })
                .collect(Collectors.toList());
    }

    public Flux<Vendor> getAllVendorsDirectly() {
        return vendorRepository.findAll();
    }
}
