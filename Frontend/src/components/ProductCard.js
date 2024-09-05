import React from "react";
import { useNavigate } from "react-router";
import { useCart } from "../pages/CartContext"; // Import useCart hook

const ProductCard = ({ productImage, productName, vendorName, price, product }) => {
  const { dispatch } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: { product } });
  };

  const handleViewProduct = () => {
    navigate(`/product/${product.id}`); // Navigate to product detail page with product ID
  };

  return (
    <div className="bg-white border-gray-100 border-2 rounded-lg  transition-transform duration-300 transform hover:scale-105 flex flex-col h-full overflow-hidden">
      <img
        onClick={handleViewProduct}
        src={product.productImageUrl}
        alt={productName}
        className="w-full h-48 object-cover cursor-pointer rounded-t-lg transition-transform duration-300 transform hover:scale-110"
      />
      <div className="flex flex-col flex-grow p-2">
        <h1 className="text-2xl font-semibold text-slate-900 ">{productName}</h1>
        <div className="text-sm font-semibold text-slate-500">₹{price}</div>
        <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
          Vendor: {vendorName}
        </div>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <button
          onClick={handleViewProduct}
          className="bg-orange-400 h-10 px-6 font-semibold rounded-md text-white hover:bg-orange-500"
          type="button"
        >
          Buy Now
        </button>
        <button
          onClick={handleAddToCart}
          className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900 hover:bg-gray-200"
          type="button"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
