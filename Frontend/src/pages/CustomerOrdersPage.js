import React from 'react';
import OrderCard from '../components/CustomerOrdersCard';

const ordersData = [
  {
    id: 1,
    orderDate: "2024-08-30",
    totalAmount: null, // Total amount will be calculated in the component
    shippingAddress: "123 Elm Street, Springfield, IL, 62704",
    items: [
      {
        productName: "Updated Cool Gadget",
        description: "An updated description.",
        productImageUrl: "http://example.com/updated-product.jpg",
        quantity: 2,
        price: 29.99,
      },
    ],
  },
  {
    id: 2,
    orderDate: "2024-08-29",
    totalAmount: null,
    shippingAddress: "456 Oak Avenue, Lincoln, NE, 68521",
    items: [
      {
        productName: "Super Widget",
        description: "The best widget ever.",
        productImageUrl: "http://example.com/super-widget.jpg",
        quantity: 1,
        price: 49.99,
      },
      {
        productName: "Accessory Kit",
        description: "All the accessories you need.",
        productImageUrl: "http://example.com/accessory-kit.jpg",
        quantity: 3,
        price: 19.99,
      },
    ],
  },
  // Add more orders here as needed
];

const OrdersPage = () => {
  return (
    <div className="p-6 space-y-6">
      {ordersData.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrdersPage;
