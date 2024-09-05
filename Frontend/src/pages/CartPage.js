import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useCart } from './CartContext';
import { Link , useNavigate } from 'react-router-dom'; // Assuming you're using React Router

const CartPage = () => {
  const { cart, dispatch } = useCart();
  const [shippingAddress, setShippingAddress] = useState('');

  const navigate = useNavigate();
  // Calculate the total amount
  const totalAmount = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  // Prepare the payload for the POST request
  const prepareOrderPayload = () => {
    const customerId = Cookies.get('id'); // Assuming 'customerId' is stored in cookies

    const orderPayload = {
      customerId: parseInt(customerId, 10), // Convert to an integer
      orderDate: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
      totalAmount: totalAmount,
      shippingAddress: shippingAddress, // Use the inputted shipping address
      items: cart.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
        vendorId: item.product.vendor.id // Assuming each product has a vendor object with an ID
      }))
    };

    return orderPayload;
  };

  // Handle checkout process
  // const handleCheckout = async () => {
  //   if (!shippingAddress) {
  //     alert('Please enter a shipping address.');
  //     return;
  //   }

  //   const orderPayload = prepareOrderPayload();

  //   try {
  //     const response = await axios.post('http://localhost:8082/orders', orderPayload);
  //     console.log('Order placed successfully:', response.data);
  //     navigate("/success")
  //     // Optionally, clear the cart after successful order placement
  //     dispatch({ type: 'CLEAR_CART' }); // Clear the cart if the order is successful
  //   } catch (error) {
  //     console.error('Error placing order:', error);
  //     alert('Failed to place order. Please try again.');
  //   }
    
  // };

  // Handle checkout process
const handleCheckout = async () => {
  if (!shippingAddress) {
    alert('Please enter a shipping address.');
    return;
  }

  const orderPayload = prepareOrderPayload();

  var options = {
    key: 'rzp_test_BzGXIUNCYG3dNN',
    key_secret: 'SOUrPBISznqiPhUP7WIKtACT',
    amount: totalAmount * 100, // Razorpay expects the amount in paise (1 INR = 100 paise)
    currency: 'INR',
    name: 'Quickfix',
    description: `Order for ${cart.length} items`,
    handler: async function (response) {
      const paymentId = response.razorpay_payment_id;
      try {
        const orderResponse = await axios.post('http://localhost:8082/orders', orderPayload);
        console.log('Order placed successfully:', orderResponse.data);
        
        // Navigate to success page
        

        // Optionally, clear the cart after successful order placement
        dispatch({ type: 'CLEAR_CART' }); // Clear the cart if the order is successful
        navigate("/success")
        alert('Payment successful!');
      } catch (error) {
        console.error('Error placing order:', error);
        alert('Payment failed. Please try again.');
      }
    },
    theme: {
      color: '#07a291db',
    },
  };
  
  var pay = new window.Razorpay(options);
  pay.open();
};


  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.product.id} className="bg-gray-100 rounded-lg  p-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{item.product.productName}</h3>
                <p className="text-gray-600">By : {item.product.vendor.name}</p>
                <p className="text-gray-700">
                  ${item.product.price} x {item.quantity} = ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => dispatch({ type: 'DECREASE_QUANTITY', payload: { id: item.product.id } })}
                  className="bg-gray-300 text-gray-700 py-1 px-2 rounded hover:bg-gray-400 transition duration-200"
                >
                  -
                </button>
                <span className="text-lg font-bold">{item.quantity}</span>
                <button
                  onClick={() => dispatch({ type: 'ADD_TO_CART', payload: { product: item.product } })}
                  className="bg-gray-300 text-gray-700 py-1 px-2 rounded hover:bg-gray-400 transition duration-200"
                >
                  +
                </button>
                <button
                  onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: { id: item.product.id } })}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Input field for shipping address */}
      <div className="mt-6">
        <label htmlFor="shippingAddress" className="block text-lg font-bold mb-2">Shipping Address</label>
        <input
          type="text"
          id="shippingAddress"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter your shipping address"
        />
      </div>

      {/* Display total amount */}
      <div className="mt-6 text-center">
        <h2 className="text-2xl font-bold">Total Amount: ₹{totalAmount.toFixed(2)}</h2>
        <button
          onClick={handleCheckout}
          className="mt-4 bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-700 transition duration-200"
        >
          Checkout
        </button>
        <div className="mt-4">
          <Link to="/" className="text-blue-500 hover:underline">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
