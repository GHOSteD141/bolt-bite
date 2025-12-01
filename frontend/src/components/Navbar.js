import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-orange-600">🍕 Bolt Bite</Link>
        
        <div className="flex gap-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-orange-600 font-medium">Home</Link>
          <Link to="/how-it-works" className="text-gray-700 hover:text-orange-600 font-medium">How It Works</Link>
          <Link to="/about" className="text-gray-700 hover:text-orange-600 font-medium">About</Link>
          <Link to="/auth" className="bg-orange-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-600">Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
