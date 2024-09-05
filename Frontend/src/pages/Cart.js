import React from 'react';
import ProductCard from "../components/ProductCard";
import { useCart } from './CartContext'; // Adjust the path as necessary
import CartPage from "./CartPage";

const Cart = () => {
  const { dispatch } = useCart(); // Get dispatch from CartContext

  const handleAddToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product } });
  };

  
  return (
    <div className="flex space-x-8">
      <div className="w-1/2">
        <h2 className="text-2xl font-bold mb-6">Products</h2>
        <div className="grid grid-cols-1 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
      <div className="w-1/2">
        <CartPage />
      </div>
    </div>
  );
};

export default Cart;
