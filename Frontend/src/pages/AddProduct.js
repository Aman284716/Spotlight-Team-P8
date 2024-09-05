import React, { useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";

const vid = Cookies.get("id");

console.log(vid)

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    vendorId: vid,
    productName: "",
    description: "",
    price: "",
    category: "",  // The category will now be selected from a dropdown
    productImageUrl: ""
  });

  const [imageFile, setImageFile] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataForImage = new FormData();
    formDataForImage.append("file", file);
    formDataForImage.append("upload_preset", "ymsskzwa");
    formDataForImage.append("cloud_name", "dzm3qqhtc");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dzm3qqhtc/image/upload",
        {
          method: "POST",
          body: formDataForImage
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const result = await response.json();
      const imageUrl = result.secure_url;

      setFormData((prevData) => ({
        ...prevData,
        productImageUrl: imageUrl
      }));

      setImageUploaded(true);
    } catch (error) {
      console.error("Error:", error);
      setError("There was a problem with the image upload.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Ensure that image URL is available before submitting
    if (!formData.productImageUrl) {
      setError("Please upload an image.");
      return;
    }

    const payload = {
      ...formData,
      productImageUrl: formData.productImageUrl // Ensure image URL is set
    };

    try {
      const response = await axios.post(
        "http://localhost:8083/products",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201 || response.status === 200) {
        setSuccess("Product added successfully!");
        setFormData({
          vendorId: vid,
          productName: "",
          description: "",
          price: "",
          category: "",
          productImageUrl: ""
        });
        setImageFile(null);
        setImageUploaded(false);
      } else {
        setError("Failed to add product. Please try again.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setError(
        error.response?.data?.message ||
        "Failed to add product. Please check your input and try again."
      );
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="productName">Product Name</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
              className="border rounded-md p-2 w-full"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1" htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="border rounded-md p-2 w-full"
              rows="4"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1" htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="border rounded-md p-2 w-full"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1" htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="border rounded-md p-2 w-full"
              required
            >
              <option value="">Select a category</option>
              <option value="retail">Retail</option>
              <option value="restaurant">Restaurant</option>
              <option value="services">Services</option>
              <option value="healthcare">HealthCare</option>
              <option value="education">Education</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1" htmlFor="productImage">Product Image</label>
            <input
              type="file"
              id="productImage"
              onChange={handleFileChange}
              className="border rounded-md p-2 w-full"
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
