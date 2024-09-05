package com.example.Vendor.repository;

import com.example.Vendor.model.VendorAdvertisement;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VendorAdvertisementRepository extends ReactiveMongoRepository<VendorAdvertisement, Integer> {
}
