import React from 'react';

const OrderCard = ({ order }) => {
  // Calculate the total amount by summing up the price * quantity for each item
  const totalAmount = order.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      {/* Order ID and Date */}
      <div className="flex justify-between mb-4">
        <div className="text-gray-800">
          <strong>Order ID:</strong> {order.id}
        </div>
        <div className="text-gray-600">
          <strong>Order Date:</strong> {order.orderDate}
        </div>
      </div>

      {/* Order Items */}
      <div className="space-y-4">
        {order.items.map((item, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm"
          >
            <img
              src={item.productImageUrl}
              alt={item.productName}
              className="w-16 h-16 object-cover rounded-md mr-4"
            />
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.productName}
              </h3>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-gray-500">
                <strong>Quantity:</strong> {item.quantity}
              </p>
              <p className="text-gray-500">
                <strong>Price:</strong> ₹{item.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Shipping Address and Total Amount */}
      <div className="mt-6">
        <p className="text-gray-700">
          <strong>Shipping Address:</strong> {order.shippingAddress}
        </p>
        <p className="text-gray-900 font-bold mt-2">
          <strong>Total Amount:</strong> ₹{totalAmount.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default OrderCard;
