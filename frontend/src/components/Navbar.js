import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16 gap-12">
          
          {/* Brand */}
          <Link to="/" className="text-2xl font-bold text-orange-500 absolute left-4">
            Bolt Bite
          </Link>

          {/* Center - Navigation Links */}
          <div className="flex gap-8 items-center">
            <Link to="/" className="text-gray-700 hover:text-orange-500 font-medium transition">
              Home
            </Link>
            <Link to="/about-us" className="text-gray-700 hover:text-orange-500 font-medium transition">
              About
            </Link>
            <Link to="/how-it-works" className="text-gray-700 hover:text-orange-500 font-medium transition">
              How It Works
            </Link>
          </div>

          {/* Right Side - Login/Signup Buttons */}
          <div className="flex gap-4 absolute right-4">
            <Link to="/login" className="px-6 py-2 text-orange-500 font-semibold hover:text-orange-600 transition">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
