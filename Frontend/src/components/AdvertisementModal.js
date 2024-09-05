// AdvertisementModal.js
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AdvertisementModal = ({ isOpen, onClose, onSuccess }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const vendorId = Cookies.get("id"); // Get vendor ID from cookies

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file); // Set the selected file to the state
  };

  const handleUpload = async () => {
    if (!image) return;

    setLoading(true);
    const formDataForImage = new FormData();
    formDataForImage.append("file", image);
    formDataForImage.append("upload_preset", "ymsskzwa");
    formDataForImage.append("cloud_name", "dzm3qqhtc");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dzm3qqhtc/image/upload", // Replace with your Cloudinary URL
        {
          method: "POST",
          body: formDataForImage,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const result = await response.json();
      const advertisementImageUrl = result.secure_url;

      // Send POST request for advertisement
      await axios.post('http://localhost:8084/advertisements', {
        vendorId: vendorId, // Use the vendor ID from cookies
        advertisementImageUrl: advertisementImageUrl,
      });

      onSuccess(); // Callback to refresh data or close modal
      onClose(); // Close modal after success

    } catch (error) {
      console.error('Error uploading advertisement:', error);
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Upload Advertisement</h2>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
          />
          <div className="mt-4">
            <button
              onClick={handleUpload}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              {loading ? 'Uploading...' : 'Upload'}
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-gray-600 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default AdvertisementModal;
