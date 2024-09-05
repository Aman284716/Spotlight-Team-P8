import React from "react";

const ReviewCard = ({ rating, message }) => {
  // Function to render stars based on rating
  const renderStars = () => {
    const stars = Array(5).fill(false).map((_, index) => index < rating);
    return stars.map((filled, index) => (
      <span key={index} className={filled ? "text-yellow-500" : "text-gray-300"}>
        ★
      </span>
    ));
  };

  return (
    <div className="bg-gray-100 rounded-lg p-4 mb-4">
      <div className="flex items-center mb-2">
        <div className="text-xl">{renderStars()}</div>
      </div>
      <p className="text-gray-700">{message}</p>
    </div>
  );
};

export default ReviewCard;
