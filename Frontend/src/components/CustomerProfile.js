import React from "react";
import OrderCard from "./OrderCard";

const CustomerProfile = ({ customer, orders }) => {
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
        </div>
      </div>

      {/* Orders Section */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4">My Orders</h3>
      <div className="space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        ) : (
          <p className="text-gray-700">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default CustomerProfile;
