package com.example.Vendor.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "vendor_advertisements")
@Getter
@Setter
public class VendorAdvertisement {

    @Id
    private Integer id;
    private Integer vendorId;
    private String advertisementImageUrl;
}
