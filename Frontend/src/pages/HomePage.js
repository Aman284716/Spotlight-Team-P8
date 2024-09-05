import React, { useState, useEffect } from "react";
import axios from "axios";
import Category from "../components/CategoryCard";
import VendorCard from "../components/VendorCard";
import ProductCard from "../components/ProductCard";
import Slideshow from '../components/SlideShow';
import CustomAlertMessage from "../components/CustomAlertMessage";
import Cookies from 'js-cookie';

const HomePage = () => {
  const [alertMessage, setAlertMessage] = useState("");
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleAddToCart = (productName) => {
    setAlertMessage(`${productName} added to cart!`);
  };

  const closeAlert = () => {
    setAlertMessage("");
  };



  useEffect(() => {
    // Fetch vendors from backend
    axios.get('http://localhost:8084/vendors')
      .then(response => {
        setVendors(response.data.slice(-4).reverse());
      })
      .catch(error => {
        console.error("There was an error fetching the vendors!", error);
      });

    // Fetch products from backend
    axios.get('http://localhost:8083/products')
      .then(response => {
        setProducts(response.data.slice(-8).reverse());
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
    
      const userId = Cookies.get('id');
      console.log('User ID from cookie:', userId);

    // Define your categories or fetch them if they come from an API
      setCategories([
        {
          imageUrl: "https://th.bing.com/th/id/R.824bf63dd4dc1a7064ac358248374886?rik=%2ffT2YlaUBj7dWw&riu=http%3a%2f%2fclipart-library.com%2fimage_gallery%2f62636.png&ehk=VciQP0KpsWhf03kWb8XyhIg6xDg4r1ytiR9Pzad8epk%3d&risl=&pid=ImgRaw&r=0",
          name: "Retail",
        },
        {
          imageUrl: "https://webstockreview.net/images/coffee-clipart-coffee-house-16.png",
          name: "Restaurant",
        },
        {
          imageUrl: "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/35029/customer-service-woman-clipart-md.png",
          name: "Services",
        },
        {
          imageUrl: "https://cdn2.iconfinder.com/data/icons/medicine-pt-12/100/123_-_pharmacy_clinic_hospital_drug_store_medical-512.png",
          name: "Healthcare",
        },
        {
          imageUrl: "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/7766421/school-and-education-graphic-concept-clipart-md.png",
          name: "Education",
        },
      ]);
  }, []);

  const images = [
    "https://th.bing.com/th/id/OIP.e-MNp8LSaxg1COU5VHptwAHaEK?rs=1&pid=ImgDetMain",
        "https://static.vecteezy.com/system/resources/previews/000/179/348/original/stylish-vector-banner-design-with-offer-details-for-advertising.jpg",
    "https://th.bing.com/th/id/OIP.KoKjU0zj3m8KOZ-lY9-GLAAAAA?rs=1&pid=ImgDetMain"
  ];

  return (<>
        <Slideshow images={images} height="400px" />
    <div className="container mx-auto p-4">
      <div className="flex justify-center items-center mt-8">
      </div>
      <h1 className="text-3xl font-bold text-center mt-2 mb-6">Welcome to Our Marketplace</h1>

      {/* Categories Section */}
      <h2 className="text-2xl font-semibold mb-4">Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {categories.map((category, index) => (
          <Category key={index} imageUrl={category.imageUrl} name={category.name} />
        ))}
      </div>

      {/* Vendors Section */}
      <h2 className="text-2xl font-semibold mb-4">Vendors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {vendors.map(vendor => (
          <VendorCard
            key={vendor.id}
            vendorPhoto={vendor.profileImageUrl}
            shopName={vendor.storeName}
            businessCategory={vendor.businessCategory}
            location={vendor.location}
            vendor={vendor}
          />
        ))}
      </div>

      {/* Products Section */}
      <h2 className="text-2xl font-semibold mb-4">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {products.map(product => (
          <ProductCard
            key={product.id}
            productImage= {product.productImageUrl}
            productName={product.productName}
            vendorName={product.vendor.name}
            price={product.price}
            product={product}
            onAddToCart={() => handleAddToCart(product.productName)}
          />
        ))}
      </div>

      {alertMessage && (
        <CustomAlertMessage message={alertMessage} onClose={closeAlert} />
      )}
    </div>
    </>
  );
};

export default HomePage;
