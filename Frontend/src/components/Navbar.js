import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { useCart } from '../pages/CartContext'; // Adjust the import path as necessary
import Cookies from 'js-cookie'; // Import js-cookie
import logo from "../assets/NavbarImage.png";

const Navbar = () => {
  const { getCartCount } = useCart(); // Access getCartCount from CartContext
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userType = Cookies.get("userType"); // Get user type from cookies

  const handleLogout = () => {
    // Clear cookies
    Cookies.remove("userType");
    Cookies.remove("username");
    // Redirect to login page
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCartClick = () => {
    if (userType) {
      navigate("/cart"); // Redirect to cart if user is logged in
    } else {
      navigate("/login"); // Redirect to login if user is not logged in
    }
  };

  return (
    <nav className="bg-gray-900 p-4 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Heading */}
        <div className="flex items-center text-white text-2xl font-bold">
          <img src={logo} alt="Logo" className="h-12 w-12 mr-2" />
          <Link to="/" className="hover:text-gray-400 transition duration-200">Spotlight</Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden">
          <button onClick={toggleMobileMenu} className="text-white text-2xl focus:outline-none">
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Navigation Links for Large Screens */}
        <ul className="hidden lg:flex space-x-4 lg:space-x-8">
          <li>
            <Link to="/" className="block text-white px-3 py-2 rounded-md text-sm font-medium hover:text-gray-400 transition duration-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" className="block text-white px-3 py-2 rounded-md text-sm font-medium hover:text-gray-400 transition duration-200">
              Shop
            </Link>
          </li>
          <li>
            <Link to="/vendors" className="block text-white px-3 py-2 rounded-md text-sm font-medium hover:text-gray-400 transition duration-200">
              Vendors
            </Link>
          </li>
          <li>
            <Link to="/about" className="block text-white px-3 py-2 rounded-md text-sm font-medium hover:text-gray-400 transition duration-200">
              About
            </Link>
          </li>
          <li>
            <Link to="/events" className="block text-white px-3 py-2 rounded-md text-sm font-medium hover:text-gray-400 transition duration-200">
              Events
            </Link>
          </li>
          <li>
            <Link to="/contact" className="block text-white px-3 py-2 rounded-md text-sm font-medium hover:text-gray-400 transition duration-200">
              Contact
            </Link>
          </li>
        </ul>

        {/* Icons and Buttons for Large Screens */}
        <div className="hidden lg:flex items-center space-x-6">
          <button onClick={handleCartClick} className="relative text-white">
            <FaShoppingCart className="text-2xl hover:text-gray-400 transition duration-200" />
            {/* Display cart count */}
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-3 bg-red-600 text-white text-xs rounded-full px-2 py-1">
                {getCartCount()}
              </span>
            )}
          </button>

          {!userType ? (
            <Link
              to="/login"
              className="bg-gray-800 border border-gray-600 text-white px-4 py-2 rounded-md hover:bg-white hover:text-gray-800 transition duration-200"
            >
              Login/Register
            </Link>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to={`/${userType}-profile`} className="text-white">
                <FaUser className="text-2xl hover:text-gray-400 transition duration-200" />
              </Link>
              <button
                onClick={handleLogout}
                className="bg-gray-800 border border-gray-600 text-white px-4 py-2 rounded-md hover:bg-white hover:text-gray-800 transition duration-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <ul className="flex flex-col space-y-2 bg-gray-900 p-4">
            <li>
              <Link to="/" className="block text-white px-3 py-2 rounded-md text-sm font-medium hover:text-gray-400 transition duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className="block text-white px-3 py-2 rounded-md text-sm font-medium hover:text-gray-400 transition duration-200">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/vendors" className="block text-white px-3 py-2 rounded-md text-sm font-medium hover:text-gray-400 transition duration-200">
                Vendors
              </Link>
            </li>
            <li>
              <Link to="/about" className="block text-white px-3 py-2 rounded-md text-sm font-medium hover:text-gray-400 transition duration-200">
                About
              </Link>
            </li>
            <li>
              <Link to="/events" className="block text-white px-3 py-2 rounded-md text-sm font-medium hover:text-gray-400 transition duration-200">
                Events
              </Link>
            </li>
            <li>
              <Link to="/contact" className="block text-white px-3 py-2 rounded-md text-sm font-medium hover:text-gray-400 transition duration-200">
                Contact
              </Link>
            </li>
            <li>
              <button onClick={handleCartClick} className="relative text-white px-3 py-2 rounded-md text-sm font-medium hover:text-gray-400 transition duration-200">
                <FaShoppingCart className="inline-block text-2xl mr-2" />
                Cart
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-1">
                    {getCartCount()}
                  </span>
                )}
              </button>
            </li>
            {!userType ? (
              <li>
                <Link
                  to="/login"
                  className="block bg-gray-800 border border-gray-600 text-white px-4 py-2 rounded-md hover:bg-white hover:text-gray-800 transition duration-200"
                >
                  Login/Register
                </Link>
              </li>
            ) : (
              <li>
                <div className="flex items-center space-x-4">
                  <Link to={`/${userType}-profile`} className="text-white px-3 py-2 rounded-md text-sm font-medium hover:text-gray-400 transition duration-200">
                    <FaUser className="inline-block text-2xl mr-2" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block bg-gray-800 border border-gray-600 text-white px-4 py-2 rounded-md hover:bg-white hover:text-gray-800 transition duration-200"
                  >
                    Logout
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
