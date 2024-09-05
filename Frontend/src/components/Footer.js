import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-8">

          {/* Column 1: Company Information */}
          <div className="lg:w-1/3">
            <h1 className="text-3xl font-bold text-white mb-4">
              <Link to="/">Spotlight</Link>
            </h1>
            <p className="text-sm mb-4">Discover the best products with us. Bringing quality to your doorstep.</p>
            <p className="text-sm">© {new Date().getFullYear()} Spotlight. All rights reserved.</p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:w-1/3">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Policies */}
          <div className="lg:w-1/3">
            <h2 className="text-xl font-semibold text-white mb-4">Policies</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/pricing-policy" className="hover:text-white">
                  Pricing Policy
                </Link>
              </li>
              <li>
                <Link to="/copyright-policy" className="hover:text-white">
                  Copyright Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-8 flex justify-center space-x-6">
          <a href="https://facebook.com" className="text-gray-400 hover:text-white">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" className="text-gray-400 hover:text-white">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" className="text-gray-400 hover:text-white">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" className="text-gray-400 hover:text-white">
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
