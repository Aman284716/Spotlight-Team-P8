import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ imageUrl, name }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${name}/product`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col items-center cursor-pointer transition-all duration-300 ease-in-out p-4 group"
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt={name}
          className="w-32 h-32 rounded-full object-cover mb-4 transition-all duration-300 ease-in-out"
        />
        <div className="absolute inset-0 flex items-center justify-center rounded-full border-4 border-transparent group-hover:border-orange-500 transition-all duration-300 ease-in-out"></div>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 font-inter transition-colors duration-300 ease-in-out group-hover:text-orange-500">
        {name}
      </h3>
    </div>
  );
};

export default CategoryCard;
