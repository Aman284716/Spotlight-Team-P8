import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie
import logo from "../assets/Spotlight.png";
import loginbg from "../assets/loginbg.jpg"; // Adjust the path to your logo

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error message

    try {
      // Fetch all vendors
      const vendorsResponse = await fetch("http://localhost:8888/vendors/all");
      const vendors = await vendorsResponse.json();

      // Fetch all customers
      const customersResponse = await fetch("http://localhost:8888/customers");
      const customers = await customersResponse.json();

      // Check if the user exists in customers
      const customerUser = customers.find(
        (customer) => customer.username === username
      );

      // Check if the user exists in vendors
      const vendorUser = vendors.find(
        (vendor) => vendor.name === username
      );

      // Simulate password hash check for customer
      if (customerUser && customerUser.passwordHash === password) {
        // Store user data in cookies
        Cookies.set("userType", "customer");
        Cookies.set("id", customerUser.userId);
        // Redirect to homepage on successful login
        navigate("/");
      } 
      // Simulate password hash check for vendor
      else if (vendorUser && vendorUser.passwordHash === password) {
        // Store user data in cookies
        Cookies.set("userType", "vendor");
        Cookies.set("id", vendorUser.id);
        // Redirect to homepage on successful login
        navigate("/vendor-profile");
      } 
      // If both checks fail
      else {
        setErrorMessage("Login failed: Invalid username or password");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage("Login failed: Unable to fetch data");
    }
  };

  const divStyle = {
    backgroundImage: `url(${loginbg})`,
    backgroundSize: 'cover',        // Makes the background image cover the entire element
    backgroundRepeat: 'no-repeat',  // Prevents the image from repeating
    backgroundPosition: 'center',   // Centers the background image
    height: '100vh',                // Makes sure the div takes up the full viewport height
    width: '100vw'                  // Makes sure the div takes up the full viewport width
  };

  return (
    <div className="min-h-screen flex items-center justify-center"
      style={divStyle} // Corrected style prop
    >
      <div className="bg-white p-8 rounded-lg shadow-lg shadow-blue-400 w-full max-w-md">
        <center><img src={logo} alt="Logo" className="h-14 w-14" /></center>
        <h2 className="text-2xl font-bold text-center mb-8">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-gray-600">New to our site?</p>
          <div className="mt-2">
            <Link
              to="/register"
              className="text-blue-400 p-2 rounded hover:underline transition duration-200 mt-8"
            >
              Register Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
