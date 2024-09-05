import React from "react";

const AboutUsPage = () => {
  return (
      <div className="p-6 space-y-16">
          
          <h1 className="text-3xl font-bold text-center mb-6">Know About Us</h1>
      {/* Problem Statement Section */}
      <div className="flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4">Problem Statement</h2>
          <p className="text-gray-700">
            Many businesses and individuals face challenges when it comes to 
            managing their online presence effectively. The problem lies in 
            the lack of integrated solutions that are easy to use, customizable, 
            and scalable to meet the diverse needs of different users.
          </p>
        </div>
        <div className="lg:w-1/2 p-4">
          <img
            src="https://via.placeholder.com/500"
            alt="Problem Statement"
            className="w-full h-auto rounded-md"
          />
        </div>
      </div>

      {/* Our Approach Section */}
      <div className="flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 p-4 order-last lg:order-first">
          <img
            src="https://via.placeholder.com/500"
            alt="Our Approach"
            className="w-full h-auto rounded-md"
          />
        </div>
        <div className="lg:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4">Our Approach</h2>
          <p className="text-gray-700">
            Our approach is to develop a platform that brings together the best
            tools for managing an online presence, with a focus on ease of use 
            and flexibility. We aim to create a user-friendly interface that 
            simplifies complex tasks, allowing users to focus on growing their 
            businesses.
          </p>
        </div>
      </div>

      {/* Our Team Section */}
      <div className="flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4">Our Team</h2>
          <p className="text-gray-700">
            Our team is composed of experienced professionals from various 
            fields, including software development, design, and marketing. We 
            work together to deliver high-quality solutions that meet the needs 
            of our clients. Our diverse backgrounds enable us to approach 
            problems from different angles, ensuring comprehensive solutions.
          </p>
        </div>
        <div className="lg:w-1/2 p-4">
          <img
            src="https://via.placeholder.com/500"
            alt="Our Team"
            className="w-full h-auto rounded-md"
          />
        </div>
      </div>

      {/* Future Scope Section */}
      <div className="flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 p-4 order-last lg:order-first">
          <img
            src="https://via.placeholder.com/500"
            alt="Future Scope"
            className="w-full h-auto rounded-md"
          />
        </div>
        <div className="lg:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4">Future Scope</h2>
          <p className="text-gray-700">
            Looking forward, we plan to expand our platform with more features 
            that cater to the evolving needs of our users. We are committed to 
            staying ahead of industry trends and continuously improving our 
            offerings to ensure that our users have access to the best tools 
            available.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
