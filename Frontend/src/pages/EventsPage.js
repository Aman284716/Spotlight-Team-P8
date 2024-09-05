import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventsPage = () => {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]); // State to hold offers

  // Sample data for events
  const events = [
    {
      id: 1,
      imageUrl: 'https://patch.com/img/biz/sites/default/files/users/22960371/20170927094108/2017-09-26_11_48_19-reader.png',
      vendorId: '5',
    },
    {
      id: 2,
      imageUrl: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/pop-up-shop-event-gold-glitter-flyer-design-template-8b7197bfbf0e0925354c383da4723912_screen.jpg?ts=1609948607',
      vendorId: '3',
    },
  ];

  // Fetch advertisements from API
  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const response = await axios.get('http://localhost:8888/advertisements');
        setOffers(response.data); // Assuming response.data is an array of offers
      } catch (error) {
        console.error('Error fetching advertisements:', error);
      }
    };

    fetchAdvertisements();
  }, []); // Empty dependency array to run once on mount

  const handleImageClick = (vendorId) => {
    navigate(`/vendor/${vendorId}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Offers Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Offers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-lg shadow-lg cursor-pointer"
              onClick={() => handleImageClick(offer.vendorId)}
            >
              <img
                src={offer.advertisementImageUrl} // Use the correct field for image URL
                alt={`Offer ${offer.id}`}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Events Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-lg cursor-pointer"
              onClick={() => handleImageClick(event.vendorId)}
            >
              <img
                src={event.imageUrl}
                alt={`Event ${event.id}`}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
