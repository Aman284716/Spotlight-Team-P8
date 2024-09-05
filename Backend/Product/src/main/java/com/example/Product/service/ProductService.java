package com.example.Product.service;

import com.example.Product.model.Product;
import com.example.Product.dto.ProductDTO;
import com.example.Product.dto.VendorDTO;
import com.example.Product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private WebClient.Builder webClientBuilder;

    @Autowired
    SequenceService sequenceService;

    private static final String VENDOR_SERVICE_URL = "http://localhost:8084/vendors/";

    public Mono<Product> createProduct(Product product) {
        return sequenceService.getNextSequence("product_seq")
                .map(seq -> {
                    product.setId(seq);
                    return product;
                })
                .flatMap(productRepository::save);
    }

    public Flux<ProductDTO> getProductByVendorid(Integer vendorId) {
        return productRepository.findByVendorId(vendorId)
                .flatMap(product -> fetchVendorDetails(product.getVendorId())
                        .map(vendorDTO -> convertToDTO(product, vendorDTO)));
    }

    public Flux<ProductDTO> getProductBycategory(String category) {
        return productRepository.findByCategory(category)
                .flatMap(product -> fetchVendorDetails(product.getVendorId())
                        .map(vendorDTO -> convertToDTO(product, vendorDTO)));
    }

    public Flux<ProductDTO> getAllProducts() {
        return productRepository.findAll()
                .flatMap(product -> fetchVendorDetails(product.getVendorId())
                        .map(vendorDTO -> convertToDTO(product, vendorDTO)));
    }


    public Mono<ProductDTO> getProductById(Integer id) {
        return productRepository.findById(id)
                .flatMap(product -> fetchVendorDetails(product.getVendorId())
                        .map(vendorDTO -> convertToDTO(product, vendorDTO)));
    }

//    public Flux<ProductDTO> getAllProducts() {
//        return productRepository.findAll()
//                .flatMap(product -> fetchVendorDetails(product.getVendorId())
//                        .map(vendorDTO -> convertToDTO(product, vendorDTO)));
//    }

    public Mono<Product> updateProduct(Integer id, Product product) {
        return productRepository.findById(id)
                .flatMap(existingProduct -> {
                    // Update fields but retain existing reviews
                    if (product.getVendorId() != null) existingProduct.setVendorId(product.getVendorId());
                    if (product.getProductName() != null) existingProduct.setProductName(product.getProductName());
                    if (product.getDescription() != null) existingProduct.setDescription(product.getDescription());
                    if (product.getPrice() != null) existingProduct.setPrice(product.getPrice());
                    if (product.getCategory() != null) existingProduct.setCategory(product.getCategory());
                    if (product.getProductImageUrl() != null) existingProduct.setProductImageUrl(product.getProductImageUrl());

                    // Retain existing reviews
                    List<Product.Review> updatedReviews = existingProduct.getReviews();
                    if (product.getReviews() != null && !product.getReviews().isEmpty()) {
                        // Optional: Clear existing reviews if new reviews are provided
                        updatedReviews.addAll(product.getReviews());
                    }
                    existingProduct.setReviews(updatedReviews);

                    return productRepository.save(existingProduct);
                });
    }

    public Mono<Void> deleteProduct(Integer id) {
        return productRepository.deleteById(id);
    }

    public Mono<Product> addReview(Integer productId, Product.Review review) {
        return productRepository.findById(productId)
                .flatMap(product -> {
                    product.getReviews().add(review);
                    return productRepository.save(product);
                });
    }

    private Mono<ProductDTO.VendorDTO> fetchVendorDetails(Integer vendorId) {
        return webClientBuilder.build()
                .get()
                .uri(VENDOR_SERVICE_URL + vendorId)
                .retrieve()
                .bodyToMono(VendorDTO.class)
                .map(vendorDTO -> {
                    ProductDTO.VendorDTO vendorInfo = new ProductDTO.VendorDTO();
                    vendorInfo.setId(vendorDTO.getId());
                    vendorInfo.setName(vendorDTO.getName());
                    return vendorInfo;
                });
    }

    private ProductDTO convertToDTO(Product product, ProductDTO.VendorDTO vendorDTO) {
        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(product.getId());
        productDTO.setProductName(product.getProductName());
        productDTO.setDescription(product.getDescription());
        productDTO.setPrice(product.getPrice());
        productDTO.setCategory(product.getCategory());
        productDTO.setProductImageUrl(product.getProductImageUrl());
        productDTO.setVendor(vendorDTO); // Set vendor information
        productDTO.setReviews(convertToDTOReviews(product.getReviews()));
        return productDTO;
    }

    private List<ProductDTO.ReviewDTO> convertToDTOReviews(List<Product.Review> reviews) {
        return reviews.stream()
                .map(review -> {
                    ProductDTO.ReviewDTO reviewDTO = new ProductDTO.ReviewDTO();
                    reviewDTO.setCustomerId(review.getCustomerId());
                    reviewDTO.setRating(review.getRating());
                    reviewDTO.setComment(review.getComment());
                    return reviewDTO;
                })
                .collect(Collectors.toList());
    }
}
