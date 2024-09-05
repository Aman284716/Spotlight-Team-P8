import React from "react";

import { useNavigate } from 'react-router-dom';


    const RegisterPage = () => {
        const navigate = useNavigate();

        const handleCustomerRegister = () => {
            navigate("/customer-register")
        }
        const handleVendorRegister = () => {
            navigate("/vendor-register")
        }
    return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Row 1: Know more about us */}
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Know More About Us</h2>
          <p className="text-gray-700 mb-2">
            Our website offers a wide range of features to help you get the most out of your shopping experience:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>Access a vast array of products from multiple vendors.</li>
            <li>Compare prices and find the best deals.</li>
            <li>Track your orders and view your purchase history.</li>
            <li>Get personalized recommendations based on your shopping habits.</li>
            <li>Leave feedback and rate your experience with vendors.</li>
            <li>Receive notifications about new products and promotions.</li>
            <li>Secure payment options and easy returns process.</li>
          </ul>
        </div>

        {/* Row 2: Register as Customer and Vendor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Register as Customer */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h3 className="text-xl font-bold mb-4">Register as Customer</h3>
            <p className="text-gray-700 mb-6">
              Sign up to start shopping and enjoy personalized recommendations, secure payments, and more!
            </p>
            <button onClick={handleCustomerRegister} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
              Register as Customer
            </button>
          </div>

          {/* Register as Vendor */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h3 className="text-xl font-bold mb-4">Register as Vendor</h3>
            <p className="text-gray-700 mb-6">
              Join our platform to reach a larger audience, manage your products, and grow your business!
            </p>
            <button onClick={handleVendorRegister} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200">
              Register as Vendor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
