import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VendorOrderCard from '../components/VendorOrdersCard'; // Import the VendorOrderCard component
import Cookies from "js-cookie"

const VendorOrdersPage = ({ id}) => {
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const vid = Cookies.get("id");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/orders/vendor/${vid}`);
        setOrdersData(response.data);
      } catch (err) {
        console.error('Error fetching vendor orders:', err);
        setError('Failed to fetch vendor orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, vid);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Vendor Orders</h1>
      {ordersData.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        ordersData.map((order, index) => (
          <VendorOrderCard key={index} order={order} />
        ))
      )}
    </div>
  );
};

export default VendorOrdersPage;
