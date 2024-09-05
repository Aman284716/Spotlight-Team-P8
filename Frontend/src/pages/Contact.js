import React from "react";

const ContactPage = () => {
  return (
    <div className="p-6 space-y-16">

      {/* Combined Section 1 and 2: Gratitude Message and Contact Form */}
      <div className="grid lg:grid-cols-2 gap-8 items-center p-4">

        {/* Gratitude Message */}
        <div className="text-center lg:text-left">
          <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
          <p className="text-gray-700">
            We appreciate you taking the time to visit our page. If you have any questions, feedback, or need assistance, please don't hesitate to reach out. We're here to help!
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-lg mx-auto lg:mx-0 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4 text-center">Contact Us</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label className="block text-gray-700">Message</label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Message"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>

      {/* Section 3: Location and Contact Details */}
      <div className="grid lg:grid-cols-2 gap-8 items-center p-4">
        
        {/* Location Map */}
        <div className="p-4">
          <h3 className="text-xl font-bold mb-4">Our Headquarters</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509368!2d144.955925315318!3d-37.81720997975179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5772b0c788b4e4e!2sEnvato!5e0!3m2!1sen!2sau!4v1614243399904!5m2!1sen!2sau"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className="rounded-md shadow-lg"
            title="Headquarters Location"
          ></iframe>
        </div>

        {/* Contact Details */}
        <div className="p-4">
          <h3 className="text-xl font-bold mb-4">Contact Information</h3>
          <p className="text-gray-700 mb-2"><strong>Phone:</strong> +123 456 7890</p>
          <p className="text-gray-700 mb-2"><strong>Email:</strong> support@company.com</p>
          <p className="text-gray-700"><strong>Address:</strong> 123 Main Street, Anytown, USA</p>
        </div>
      </div>

    </div>
  );
};

export default ContactPage;
