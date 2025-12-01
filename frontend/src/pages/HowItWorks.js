import React from 'react';

function HowItWorks() {
  const steps = [
    {
      num: 1,
      title: "Browse Restaurants",
      description: "Explore our wide selection of restaurants and cuisines available in your area.",
      icon: "🏪"
    },
    {
      num: 2,
      title: "Select Items",
      description: "Browse menus and add your favorite food items to the cart with custom quantities.",
      icon: "🛒"
    },
    {
      num: 3,
      title: "Checkout",
      description: "Review your order, enter delivery details, and select your preferred payment method.",
      icon: "💳"
    },
    {
      num: 4,
      title: "Track Order",
      description: "Get real-time updates as your order is prepared and delivered to your doorstep.",
      icon: "🚚"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-5xl font-bold text-center mb-4 text-gray-900">How Bolt Bite Works</h1>
        <p className="text-xl text-center text-gray-600 mb-16">Get delicious food delivered in 4 simple steps</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.num} className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition">
              <div className="text-6xl mb-4">{step.icon}</div>
              <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                {step.num}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <span className="text-3xl">✅</span>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Wide Selection</h4>
                <p className="text-gray-600">7+ restaurants with 50+ menu items</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-3xl">⚡</span>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Fast Delivery</h4>
                <p className="text-gray-600">Quick preparation & doorstep delivery</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-3xl">💰</span>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Great Deals</h4>
                <p className="text-gray-600">Up to 30% discount on selected items</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-3xl">🤖</span>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">AI Support</h4>
                <p className="text-gray-600">Smart recommendations & 24/7 chat</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
