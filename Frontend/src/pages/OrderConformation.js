import React from 'react';

const OrderConfirmation = () => {
  return (
    <div className="min-h-screen bg-green-500 flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center mb-8">
          <svg
            className="w-24 h-24 text-white animate-pulse"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-white animate-zoom-in-out">
          Congratulations! Your Order Placed Successfully
        </h1>
      </div>
    </div>
  );
};

// Custom animation using Tailwind CSS for zooming in and out
export default OrderConfirmation;
