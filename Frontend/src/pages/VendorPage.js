import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import CustomAlertMessage from '../components/CustomAlertMessage';
import ReviewCard from '../components/ReviewCard';
import { useParams } from 'react-router-dom';
import VendorReviewModal from '../components/VendorReviewModal'; // Import the modal

const VendorProfilePage = () => {
  const { id } = useParams();
  const [vendorData, setVendorData] = useState(null);
  const [products, setProducts] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false); // State for modal visibility

  const handleAddToCart = (productName) => {
    setAlertMessage(`${productName} added to cart!`);
  };

  const closeAlert = () => {
    setAlertMessage("");
  };

  const handleReviewAdded = () => {
    // Refresh vendor data to include new review
    fetchVendorData();
  };

  const fetchVendorData = async () => {
    try {
      const vendorResponse = await axios.get(`http://localhost:8888/vendors/${id}`);
      setVendorData(vendorResponse.data);

      const productsResponse = await axios.get(`http://localhost:8083/products/vendor/${id}`);
      setProducts(productsResponse.data);
    } catch (err) {
      console.error("Error fetching vendor data:", err);
      setError("Failed to fetch vendor details or products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendorData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6 bg-white min-h-screen">
      {vendorData && (
        <div className=" rounded-lg bg-gray-100 p-6 flex mb-6">
          {/* Image Section */}
          <div className="w-2/12">
            <img
              src={vendorData.profileImageUrl}
              alt={vendorData.storeName}
              className=" object-cover rounded-lg"
            />
          </div>

          {/* Vendor Details Section */}
          <div className="w-2/3 pl-6 flex flex-col justify-center">
            <h2 className="text-5xl text-orange-500 font-bold mb-2">{vendorData.storeName}</h2>
            <p className="text-lg text-gray-700 mb-2">{vendorData.name}</p>
            <p className="text-gray-600 mb-1">
              <strong>Business Category:</strong> {vendorData.businessCategory}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Address:</strong> {vendorData.address}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Location:</strong> {vendorData.location}
            </p>
          </div>
        </div>
      )}

      {alertMessage && (
        <CustomAlertMessage message={alertMessage} onClose={closeAlert} />
      )}

      <div className="bg-gray-100 rounded-lg  p-6 mb-6">
        <h3 className="text-xl font-bold mb-4">Products Sold by {vendorData ? vendorData.storeName : ''}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              productImage={product.productImageUrl}
              productName={product.productName}
              vendorName={product.vendor.name}
              price={product.price}
              product={product}
              onAddToCart={() => handleAddToCart(product.productName)}
            />
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-orange-500">Reviews</h2>
        <div>
          {vendorData && vendorData.reviews && vendorData.reviews.length > 0 ? (
            vendorData.reviews.map((review, index) => (
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

        <button
          onClick={() => setShowReviewModal(true)} // Open the modal
          className="mt-6 bg-black text-white py-2 px-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Add Review
        </button>
      </div>

      {showReviewModal && (
        <VendorReviewModal 
          vendorId={id} 
          onClose={() => setShowReviewModal(false)} 
          onReviewAdded={handleReviewAdded} 
        />
      )}
    </div>
  );
};

export default VendorProfilePage;
