import React, { useEffect, useState } from "react";
import OrderCard from "../components/CustomerOrdersCard";
import Cookies from "js-cookie";
import axios from "axios"; // You'll need axios or any other HTTP client

const CustomerProfile = () => {
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const customerId = Cookies.get("id"); // Get customer ID from cookies

  useEffect(() => {
    if (customerId) {
      // Fetch customer details
      axios
        .get(`http://localhost:8888/customers/${customerId}`)
        .then((response) => {
          setCustomer(response.data);
        })
        .catch((error) => {
          console.error("Error fetching customer data:", error);
        });

      // Fetch customer orders
      axios
        .get(`http://localhost:8888/orders/customer/${customerId}`)
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    }
  }, [customerId]); // Dependency array includes customerId to refetch if it changes

  // Handler for update profile button
  const handleUpdateProfile = () => {
    alert("Update Profile clicked!");
    // Navigate to update profile page or show a form
  };

  // Handler for delete profile button
  const handleDeleteProfile = () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      alert("Profile Deleted!");
      // Proceed with the deletion logic
    }
  };

  if (!customer) {
    return <p>Loading...</p>; // Show a loading state until data is fetched
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      {/* Customer Details Section */}
      <div className="flex items-center mb-8">
        <img
          src={customer.profileImageUrl}
          alt={`${customer.firstName} ${customer.lastName}`}
          className="w-24 h-24 rounded-full mr-6 shadow-lg"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {customer.firstName} {customer.lastName}
          </h2>
          <p className="text-gray-600">Email: {customer.email}</p>
          <p className="text-gray-600">Phone: {customer.phoneNumber}</p>
          <p className="text-gray-600">Address: {customer.address}</p>
          <p className="text-gray-600">Location: {customer.location}</p>
          <div className="mt-4">
            <button
              onClick={handleUpdateProfile}
              className="mr-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Update Profile
            </button>
            <button
              onClick={handleDeleteProfile}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete Profile
            </button>
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4">My Orders</h3>
      <div className="space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => <OrderCard key={order.id} order={order} />)
        ) : (
          <p className="text-gray-700">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default CustomerProfile;
