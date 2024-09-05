import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard"; // Adjust the import path if necessary

const ProductsPage = () => {
  const { name } = useParams(); // Get the category from the URL params
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8083/products/category/${name}`);
        setProducts(response.data); // Assuming the API returns the list of products in response.data
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [name]); // Re-fetch data if the category changes

  if (loading) {
    return <div className="p-6 bg-gray-100 min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 bg-gray-100 min-h-screen">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Products in Category: {name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard
              key={product.id}
              productImage={product.productImageUrl}
              productName={product.productName}
              vendorName={product.vendor.name}
              price={product.price}
              product={product}
              category={product.category} // Pass category to ProductCard if needed
            />
          ))
        ) : (
          <p className="text-gray-700">No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
