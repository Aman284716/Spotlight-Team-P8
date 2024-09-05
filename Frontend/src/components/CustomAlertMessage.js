import React, { useState, useEffect } from "react";

const CustomAlertMessage = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Close the alert after 3 seconds
    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
      {message}
    </div>
  );
};

export default CustomAlertMessage;
