import React, { useState } from "react";

const VendorRegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    contactEmail: "",
    password: "",
    contactPhoneNumber: "",
    address: "",
    businessCategory: "", // This will be updated via dropdown
    createdDate: "",
    storeName: "",
    profileImage: "", 
    location: "",
  });

  const [imageUploaded, setImageUploaded] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
          body: formDataForImage,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const result = await response.json();
      const imageUrl = result.secure_url;

      setFormData({
        ...formData,
        profileImage: imageUrl, 
      });

      setImageUploaded(true);
      setSuccess("Image uploaded successfully!");
    } catch (error) {
      console.error("Error:", error);
      setError("There was a problem with the image upload.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.profileImage) {
      setError("Please upload a profile image.");
      return;
    }

    const payload = {
      name: formData.name,
      contactEmail: formData.contactEmail,
      passwordHash: formData.password,
      contactPhoneNumber: formData.contactPhoneNumber,
      address: formData.address,
      businessCategory: formData.businessCategory,
      createdDate: formData.createdDate,
      storeName: formData.storeName,
      profileImageUrl: formData.profileImage,
      location: formData.location,
    };

    try {
      const response = await fetch("http://localhost:8084/vendors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Vendor registered successfully:", data);
      setSuccess("Vendor registered successfully!");

      // Reset the form
      setFormData({
        name: "",
        contactEmail: "",
        password: "",
        contactPhoneNumber: "",
        address: "",
        businessCategory: "", 
        createdDate: "",
        storeName: "",
        profileImage: "",
        location: "",
      });
      setImageUploaded(false);
    } catch (error) {
      console.error("Error registering vendor:", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Register as Vendor</h2>

        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-xs italic mb-4">{success}</p>
        )}

        <form onSubmit={handleSubmit}>
          {/* Vendor Name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Vendor Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Vendor Name"
              required
            />
          </div>

          {/* Store Name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Store Name</label>
            <input
              type="text"
              name="storeName"
              value={formData.storeName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Vendor Store"
              required
            />
          </div>

          {/* Contact Email */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Contact Email</label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="vendor@example.com"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Contact Phone Number */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Contact Phone Number</label>
            <input
              type="tel"
              name="contactPhoneNumber"
              value={formData.contactPhoneNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="123-456-7890"
              required
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="789 Oak Street"
              required
            />
          </div>

          {/* Business Category Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Business Category</label>
            <select
              name="businessCategory"
              value={formData.businessCategory}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="" disabled>Select a category</option>
              <option value="Retail">Retail</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Services">Services</option>
              <option value="HealthCare">HealthCare</option>
              <option value="Education">Education</option>
            </select>
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="City, State"
              required
            />
          </div>

          {/* Profile Image Upload */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Created Date */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Created Date</label>
            <input
              type="datetime-local"
              name="createdDate"
              value={formData.createdDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default VendorRegisterPage;
