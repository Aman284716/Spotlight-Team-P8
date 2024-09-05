// src/components/VendorReviewModal.js
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const VendorReviewModal = ({ vendorId, onClose, onReviewAdded }) => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const customerId = Cookies.get("id");
    const reviewData = {
      customerId,
      rating,
      comment,
    };

    try {
      await axios.post(`http://localhost:8084/vendors/${vendorId}/reviews`, reviewData);
      onReviewAdded(); // Notify parent to refresh reviews
      onClose(); // Close modal
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Add a Review</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Rating:</label>
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="border rounded w-full py-2 px-3">
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Comment:</label>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="border rounded w-full py-2 px-3" rows="4"></textarea>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 bg-gray-300 text-black py-2 px-4 rounded">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorReviewModal;
