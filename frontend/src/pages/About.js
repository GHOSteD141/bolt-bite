import React from 'react';

function About() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-16 text-white">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-5xl font-bold mb-4">About Bolt Bite</h1>
          <p className="text-xl">Delivering delicious food, fast and fresh</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-6xl py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Bolt Bite was founded with a simple mission: to connect food lovers with their favorite restaurants and deliver amazing food directly to their doorstep.
            </p>
            <p className="text-gray-600 mb-4">
              We partner with the best local restaurants and provide a seamless ordering experience with real-time tracking, multiple payment options, and exceptional customer support.
            </p>
            <p className="text-gray-600">
              Today, Bolt Bite is trusted by thousands of customers who enjoy quick, convenient, and delicious food delivery every day.
            </p>
          </div>
          <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-gray-900">Bolt Bite</h3>
              <p className="text-gray-600 mt-2">Fast & Fresh Food Delivery</p>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-orange-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To make food delivery fast, affordable, and accessible to everyone by providing a platform that connects customers with quality restaurants and exceptional service.
            </p>
          </div>
          <div className="bg-orange-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              To become the leading food delivery platform by combining technology, customer service, and restaurant partnerships to create an unmatched delivery experience.
            </p>
          </div>
        </div>

        {/* Values */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">❤️</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Customer First</h4>
              <p className="text-gray-600">We prioritize customer satisfaction in everything we do</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🤝</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Partnerships</h4>
              <p className="text-gray-600">We believe in building strong relationships with restaurants</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Innovation</h4>
              <p className="text-gray-600">We continuously improve our service with cutting-edge technology</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
