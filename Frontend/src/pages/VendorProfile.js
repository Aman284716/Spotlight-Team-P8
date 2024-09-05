import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import VendorProduct from '../components/VendorProduct';
import Cookies from 'js-cookie';
import axios from 'axios';
import AdvertisementModal from '../components/AdvertisementModal'; // Import the modal component

const VendorProfile = () => {
  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const vendorId = Cookies.get("id");
  const navigate = useNavigate();

  console.log(vendorId)

  useEffect(() => {
    if (vendorId) {
      // Fetch vendor details
      axios
        .get(`http://localhost:8888/vendors/${vendorId}`)
        .then((response) => {
          setVendor(response.data);
        })
        .catch((error) => {
          console.error("Error fetching vendor data:", error);
        });

      // Fetch vendor products
      axios
        .get(`http://localhost:8083/products/vendor/${vendorId}`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  }, [vendorId]);

  const handleUpdateProduct = (productId) => {
    console.log(`Update product ${productId}`);
  };

  const handleDeleteProduct = (productId) => {
    console.log(`Delete product ${productId}`);
  };

  const handleAddProducts = () => {
    navigate("/add-product");
  };

  const handleViewOrders = () => {
    navigate("/vendor-orders");
  };

  const handleAddAdvertisements = () => {
    setIsModalOpen(true); // Open the modal for adding advertisements
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleSuccess = () => {
    // Logic to refresh products after adding advertisement
    axios.get(`http://localhost:8083/products/vendor/${vendorId}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  if (!vendor) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* First Section */}
      <div className="flex flex-col md:flex-row bg-white p-6 rounded-lg shadow-lg mb-6">
        <div className="flex flex-col items-center md:w-1/2 mb-4 md:mb-0">
          <img 
            src={vendor.profileImageUrl || "vendor-image.jpg"}
            alt={vendor.name}
            className="w-48 h-48 md:w-64 md:h-64 rounded-full shadow-lg object-cover"
          />
          <h2 className="text-xl font-semibold mt-4 text-center">{vendor.name}</h2>
          <p className="text-gray-700 text-center">{vendor.location}</p>
          <p className="text-gray-700 text-center">Phone: {vendor.contactPhoneNumber}</p>
          <p className="text-gray-700 text-center">Email: {vendor.contactEmail}</p>
          <p className="text-gray-700 text-center">Category: {vendor.businessCategory}</p>
        </div>
        <div className="flex flex-col md:w-1/2 space-y-4 justify-center items-center">
          <button onClick={handleViewOrders} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 w-full md:w-auto">View Orders</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 w-full md:w-auto">Update Profile</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 w-full md:w-auto">Delete Profile</button>
          <button onClick={handleAddProducts} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200 w-full md:w-auto">Add Products</button>
          <button onClick={handleAddAdvertisements} className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-200 w-full md:w-auto">Add Advertisements</button>
        </div>
      </div>

      {/* Products Section */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Products</h3>
        <div className="space-y-4">
          {products.length > 0 ? (
            products.map(product => (
              <VendorProduct
                key={product.id}
                product={product}
                onUpdate={() => handleUpdateProduct(product.id)}
                onDelete={() => handleDeleteProduct(product.id)}
              />
            ))
          ) : (
            <p className="text-gray-700">No products found.</p>
          )}
        </div>
      </div>

      {/* Advertisement Modal */}
      <AdvertisementModal 
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default VendorProfile;
