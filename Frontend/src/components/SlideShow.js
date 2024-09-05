import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Slideshow = ({ images, height }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [images.length]);

  if (!images.length) {
    return <div className="text-center">No images to display</div>;
  }

  return (
    <div
      className="relative "
      style={{ height: height }}
    >
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="object-cover w-full h-full"
        style={{ height: '100%' }} // Ensure image fits to the height of the container
      />
      {/* Optional: Add navigation buttons */}
      {images.length > 1 && (
        <button
          onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          ❮
        </button>
      )}
      {images.length > 1 && (
        <button
          onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          ❯
        </button>
      )}
    </div>
  );
};

// Define default props and prop types
Slideshow.defaultProps = {
  images: [],
  height: '600px',
};

Slideshow.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  height: PropTypes.string,
};

export default Slideshow;
