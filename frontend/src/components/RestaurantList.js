import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import Loading from './Loading';
import RestaurantCard from './RestaurantCard';

const API_URL = 'http://localhost:3005/api/restaurants';

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      let url = API_URL;
      if (params.query) {
        url += `/search/${encodeURIComponent(params.query)}`;
      }
      const response = await axios.get(url);
      setRestaurants(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to fetch restaurants');
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchData({ query });
  };

  const handleCuisineFilter = (cuisine) => {
    setSelectedCuisine(cuisine);
    // Could add cuisine filtering here
  };

  if (loading) return <Loading />;
  if (error) return <div className="container mt-3">Error: {error}</div>;

  return (
    <>
      {/* Minimalist Hero Section */}
      <section className="bg-gradient-to-b from-[#FFFBF7] to-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          
          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight mb-4">
            Delicious food,{' '}
            <span className="text-orange-500">delivered fast</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mb-12">
            Order from your favorite restaurants and get fresh, hot meals delivered right to your door.
          </p>

          {/* Search & Filter Container */}
          <div className="w-full bg-white p-3 rounded-3xl shadow-lg shadow-orange-100/40 border border-gray-100 flex flex-col sm:flex-row gap-2 items-center">
            
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i className="fas fa-search h-5 w-5 text-gray-400"></i>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                className="w-full pl-12 pr-4 py-3 sm:py-4 bg-transparent border-none focus:ring-0 text-gray-900 placeholder-gray-400 text-base focus:outline-none"
                placeholder="What are you craving?"
              />
            </div>

            {/* Divider (Desktop only) */}
            <div className="hidden sm:block w-px h-10 bg-gray-200"></div>

            {/* Filter Pills */}
            <div className="flex gap-2 w-full sm:w-auto px-2">
              <button
                onClick={() => handleCuisineFilter('')}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                  selectedCuisine === ''
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => handleCuisineFilter('Indian')}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                  selectedCuisine === 'Indian'
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Indian
              </button>
              <button
                onClick={() => handleCuisineFilter('Italian')}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                  selectedCuisine === 'Italian'
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Italian
              </button>
              <button
                onClick={() => handleCuisineFilter('Chinese')}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                  selectedCuisine === 'Chinese'
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Chinese
              </button>
            </div>

            {/* Search Button */}
            <button
              onClick={() => handleSearch(searchQuery)}
              className="w-full sm:w-auto px-8 py-3 sm:py-4 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-all shadow-md hover:shadow-lg"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Restaurants Grid */}
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Popular near you
            </h2>
            <p className="text-gray-500">
              Handpicked favorites from top-rated restaurants
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map(restaurant => (
              <RestaurantCard key={restaurant.restaurantId} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative background element */}
      <div
        className="fixed top-0 right-0 -z-10 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-20"
        style={{ marginTop: '-200px', marginRight: '-200px' }}
      />
    </>
  );
}

export default RestaurantList;
