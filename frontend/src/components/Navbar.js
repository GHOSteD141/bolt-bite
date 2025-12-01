import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left Side - Empty Space */}
          <div className="flex-1"></div>

          {/* Center - Navigation Links */}
          <div className="flex gap-8 items-center">
            <Link to="/" className="text-gray-700 hover:text-orange-500 font-medium transition">
              Home
            </Link>
            <a href="#restaurants" className="text-gray-700 hover:text-orange-500 font-medium transition">
              Restaurants
            </a>
            <a href="#about" className="text-gray-700 hover:text-orange-500 font-medium transition">
              About
            </a>
          </div>

          {/* Right Side - Login/Signup Buttons */}
          <div className="flex-1 flex justify-end gap-4">
            <button className="px-6 py-2 text-orange-500 font-semibold hover:text-orange-600 transition">
              Login
            </button>
            <button className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
