import React from 'react';
import PropTypes from 'prop-types';


// Define the Image component that takes a src prop
const Image = ({ src }) => {
  return (
    <img
      src={src}
      alt="Sidebar Image"
      className="w-full h-auto mb-4" // Added margin-bottom for spacing between images
    />
  );
};

// Define the SidebarLeft component that takes an images prop
const SidebarLeft = ({ images }) => {
  // Ensure images is always an array
  const imageArray = Array.isArray(images) ? images : [];

  return (
    <div className="h-full hidden lg:block lg:w-2/12 bg-white-200 p-4">
      {imageArray.map((src, index) => (
        <Image key={index} src={src} />
      ))}
    </div>
  );
};

// Define default props and prop types
SidebarLeft.defaultProps = {
    images: [
        "https://th.bing.com/th/id/OIP.XeDp5SDJJL5ajss_JDzjMgHaGt?rs=1&pid=ImgDetMain",
        "https://miro.medium.com/max/1080/1*8DDN_DRuSBlM74dVYUjR9Q.png",
        "https://th.bing.com/th/id/OIP.XeDp5SDJJL5ajss_JDzjMgHaGt?rs=1&pid=ImgDetMain"
  ],
};

SidebarLeft.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
};

export default SidebarLeft;
