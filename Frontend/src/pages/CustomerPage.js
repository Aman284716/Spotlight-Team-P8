import React from "react";
import CustomerProfile from "./CustomerProfile"; // Import the CustomerProfile component

const CustomerProfilePage = () => {
  // Sample customer data
  const customerData = {
    username: "Aman",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phoneNumber: "123-456-7890",
    address: "123 Elm Street",
    location: "New York, NY",
    profileImageUrl: "http://example.com/profile.jpg",
  };

  // Sample orders data
  const ordersData = [
    {
      id: "12345",
      orderDate: "2024-08-29",
      items: [
        {
          productImageUrl: "http://example.com/product1.jpg",
          productName: "Product 1",
          description: "Description of Product 1",
          quantity: 2,
          price: 29.99,
        },
        {
          productImageUrl: "http://example.com/product2.jpg",
          productName: "Product 2",
          description: "Description of Product 2",
          quantity: 1,
          price: 19.99,
        },
      ],
      shippingAddress: "123 Elm Street, New York, NY",
    },
    {
      id: "12346",
      orderDate: "2024-08-30",
      items: [
        {
          productImageUrl: "http://example.com/product3.jpg",
          productName: "Product 3",
          description: "Description of Product 3",
          quantity: 1,
          price: 49.99,
        },
      ],
      shippingAddress: "123 Elm Street, New York, NY",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <CustomerProfile customer={customerData} orders={ordersData} />
    </div>
  );
};

export default CustomerProfilePage;
