import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ShoppingPage from './pages/Shop';
import AboutUsPage from './pages/AboutUs';
import ContactPage from './pages/Contact';
import OrdersPage from './pages/CustomerOrdersPage';
import RegisterPage from './pages/Register';
import CustomerRegisterPage from './pages/CustomerRegister';
import VendorRegisterPage from './pages/VendorRegister';
import CartPage from './pages/CartPage';
import { CartProvider } from './pages/CartContext'; // Import CartProvider
import CustomerProfilePage from './pages/CustomerPage';
import VendorProfilePage from './pages/VendorPage';
import EventsPage from './pages/EventsPage';
import VendorOrdersPage from './pages/VendorOrdersPage';
import VendorProfile from './pages/VendorProfile';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/IndividualProductPage';
import AddProductForm from './pages/AddProduct';
import VendorsPage from './pages/Vendors';
import OrderConfirmation from './pages/OrderConformation';

function App() {
  return (
    <CartProvider> {/* Wrap your entire application with CartProvider */}
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar className="w-full" />
          <main className="flex-grow p-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/shop" element={<ShoppingPage />} />
              <Route path="/vendors" element={<VendorsPage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/customer-register" element={<CustomerRegisterPage />} />
              <Route path="/vendor-register" element={<VendorRegisterPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/customer-profile" element={<CustomerProfilePage />} />
              <Route path="/vendor/:id" element={<VendorProfilePage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/vendor-orders" element={<VendorOrdersPage />} />
              <Route path="/vendor-profile" element={<VendorProfile />} />
              <Route path="/:name/product" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/add-product" element={<AddProductForm />} />
              <Route path="/success" element={<OrderConfirmation />} />

            </Routes>
          </main>
          <Footer className="w-full bg-gray-800 text-white p-4" />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
