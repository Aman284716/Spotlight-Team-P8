package com.example.Vendor.service;

import com.example.Vendor.model.VendorAdvertisement;
import com.example.Vendor.repository.VendorAdvertisementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class VendorAdvertisementService {

    private final VendorAdvertisementRepository repository;
    private final SequenceService sequenceService;

    public Mono<VendorAdvertisement> createAdvertisement(VendorAdvertisement advertisement) {
        return sequenceService.getNextSequence("vendor_advertisement")
                .flatMap(sequenceId -> {
                    advertisement.setId(sequenceId);
                    return repository.save(advertisement);
                });
    }

    public Flux<VendorAdvertisement> getAllAdvertisements() {
        return repository.findAll();
    }

    public Mono<VendorAdvertisement> getAdvertisementById(Integer id) {
        return repository.findById(id);
    }

    public Mono<Void> deleteAdvertisement(Integer id) {
        return repository.deleteById(id);
    }
}
