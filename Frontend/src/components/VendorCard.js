import React from "react";
import { Link } from "react-router-dom";

const VendorCard = ({ vendorId, vendorPhoto, shopName, businessCategory, location, vendor }) => {
  return (
    <div className="flex flex-col font-sans bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 transform hover:scale-105 h-full">
      {/* Image Section */}
      <div className="relative">
        <img
          src={vendorPhoto}
          alt={shopName}
          className="w-full h-40 object-cover transition-transform duration-300 transform hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title and Category */}
        <div className="flex flex-wrap items-baseline mb-2">
          <h3 className="flex-auto text-xl font-bold text-gray-800">
            {shopName}
          </h3>
        </div>
          <p className="text-lg font-semibold text-orange-500">
            {businessCategory}
          </p>

        {/* Location */}
        <p className="text-gray-600 mb-4">{location}</p>
      </div>

      {/* Button Section */}
      <div className="p-3">
        <Link
          to={`/vendor/${vendor.id}`} // Link to the vendor's detail page
          className="h-10 w-full font-semibold rounded-md bg-orange-500 text-white hover:bg-orange-700 transition duration-200 flex items-center justify-center"
        >
          View Vendor
        </Link>
      </div>
    </div>
  );
};

export default VendorCard;
