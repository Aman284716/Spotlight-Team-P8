import React from 'react';

const VendorOrderCard = ({ order }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      {/* Order Number and Date */}
      <div className="flex justify-between mb-4">
        <div className="text-gray-800">
          <strong>Order Number:</strong> {order.id}
        </div>
        <div className="text-gray-600">
          <strong>Order Date:</strong> {order.orderDate}
        </div>
      </div>

      {/* Customer Name */}
      <div className="mb-2 text-gray-800">
        <strong>Customer:</strong> {order.customerName}
      </div>

      {/* Order Items */}
      <div className="space-y-4">
        {order.items.map((item, index) => (
          <div key={index} className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm">
            <img
              src={item.productImageUrl}
              alt={item.productName}
              className="w-16 h-16 object-cover rounded-md mr-4"
            />
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.productName}
              </h3>
              <p className="text-gray-500">
                <strong>Quantity:</strong> {item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Shipping Address */}
      <div className="mt-6">
        <p className="text-gray-700">
          <strong>Shipping Address:</strong> {order.shippingAddress}
        </p>
      </div>
    </div>
  );
};

export default VendorOrderCard;
