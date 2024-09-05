import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../pages/CartContext"; 
import ReviewCard from "../components/ReviewCard"; 
import ReviewModal from "../components/ProductReviewModal"; // Import the ReviewModal component

const ProductDetailPage = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const { dispatch } = useCart(); 
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  useEffect(() => {
    axios.get(`http://localhost:8888/products/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the product!", error);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch({ type: 'ADD_TO_CART', payload: { product } });
    }
  };

  const handleAddReview = () => {
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto bg-gray-100 rounded-lg  p-6 flex">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
            src={product.productImageUrl}
            alt={product.productName}
            className="w-64 h-64 object-cover rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div className="ml-6 flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.productName}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl font-semibold text-gray-700 mb-4">${product.price}</p>
          <p className="text-gray-500 mb-6">Shop: {product.vendor.name}</p>
          <button
            onClick={handleAddToCart}
            className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-800 transition duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        <div>
          {product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <ReviewCard
                key={index}
                rating={review.rating}
                message={review.comment}
              />
            ))
          ) : (
            <p className="text-gray-700">No reviews yet.</p>
          )}
        </div>

        {/* Add Review Button */}
        <button
          onClick={handleAddReview}
          className="mt-6 bg-black text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
        >
          Add Review
        </button>
      </div>

      {/* Review Modal */}
      <ReviewModal isOpen={isModalOpen} onClose={closeModal} productId={id} />
    </div>
  );
};

export default ProductDetailPage;
