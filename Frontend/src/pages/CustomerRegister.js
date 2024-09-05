import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/solid"; // Import a check icon from a library

const CustomerRegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    address: "",
    firstName: "",
    lastName: "",
    profileImage: ""
  });

  const [imageUploaded, setImageUploaded] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
          body: formDataForImage
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const result = await response.json();
      const imageUrl = result.secure_url;

      setFormData({
        ...formData,
        profileImage: imageUrl
      });

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

    if (!formData.profileImage) {
      setError("Please upload a profile image.");
      return;
    }

    const payload = {
      username: formData.username,
      passwordHash: formData.password,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
      firstName: formData.firstName,
      lastName: formData.lastName,
      profileImageUrl: formData.profileImage
    };

    try {
      const response = await axios.post(
        "http://localhost:8081/customers",
        payload
      );

      if (response.status === 201 || response.status === 200) {
        setSuccess("Registration successful!");
        setFormData({
          username: "",
          password: "",
          email: "",
          phoneNumber: "",
          address: "",
          firstName: "",
          lastName: "",
          profileImage: ""
        });
        setImageUploaded(false);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error registering customer:", error);
      setError(
        error.response?.data?.message ||
          "Registration failed. Please check your input and try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Register as Customer</h2>

        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-xs italic mb-4">{success}</p>
        )}

        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="John"
              required
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Doe"
              required
            />
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Aman"
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

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="example@email.com"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
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
              placeholder="123 Main St"
              required
            />
          </div>

          {/* Profile Image Upload */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Profile Image</label>
            <input
              type="file"
              name="profileImage"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={handleFileChange}
              required
            />
            {imageUploaded && (
              <div className="mt-2 text-green-500">
                <CheckCircleIcon className="h-5 w-5 inline-block" /> Image
                uploaded successfully!
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerRegisterPage;
