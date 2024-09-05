import React, { useState, useEffect } from "react";
import axios from "axios";
import VendorCard from "../components/VendorCard";

const VendorsPage = () => {
  const [vendors, setVendors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    // Fetch vendors from the server
    const fetchVendors = async () => {
      try {
        const response = await axios.get("http://localhost:8084/vendors");
        setVendors(response.data);

        // Extract unique business categories from vendors
        const uniqueCategories = [...new Set(response.data.map(vendor => vendor.businessCategory))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredVendors = vendors.filter((vendor) => {
    return selectedCategory === "" || vendor.businessCategory === selectedCategory;
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Buy From All The Vendors We Have</h1>
      
      <div className="flex justify-center mb-6">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVendors.map((vendor) => (
          <VendorCard
            key={vendor.id}
            vendorId={vendor.id}
            vendorPhoto={vendor.profileImageUrl}
            shopName={vendor.storeName}
            businessCategory={vendor.businessCategory}
                location={vendor.location}
                vendor={vendor}
          />
        ))}
      </div>
    </div>
  );
};

export default VendorsPage;
