import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard"; // Import the ProductCard component
import CustomAlertMessage from "../components/CustomAlertMessage";

const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "₹0 - ₹50", min: 0, max: 50 },
  { label: "₹51 - ₹100", min: 51, max: 100 },
  { label: "₹101 - ₹200", min: 101, max: 200 },
  { label: "₹201 and above", min: 201, max: Infinity },
];

const ShoppingPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    // Fetch products from the server
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8888/products");
        setProducts(response.data);

        // Extract unique categories from products
        const uniqueCategories = [...new Set(response.data.map(product => product.category))];
        setCategories(uniqueCategories);

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (productName) => {
    setAlertMessage(`${productName} added to cart!`);
  };

  const closeAlert = () => {
    setAlertMessage("");
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handlePriceRangeChange = (e) => {
    const selectedRange = priceRanges.find(range => range.label === e.target.value);
    setSelectedPriceRange(selectedRange);
  };

  const filteredProducts = products.filter((product) => {
    return (
      (selectedCategory === "" || product.category === selectedCategory) &&
      (product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max)
    );
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Shop</h1>
      <div className="flex justify-center mb-6 space-x-4">
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
        <select
          value={selectedPriceRange.label}
          onChange={handlePriceRangeChange}
          className="bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {priceRanges.map((range) => (
            <option key={range.label} value={range.label}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      {alertMessage && (
        <CustomAlertMessage message={alertMessage} onClose={closeAlert} />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            productImage={product.productImage}
            productName={product.productName}
            vendorName={product.vendor.name}
            price={product.price}
            product={product}
            onAddToCart={() => handleAddToCart(product.productName)}
          />
        ))}
      </div>
    </div>
  );
};

export default ShoppingPage;
