import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';
import RestaurantCard from './RestaurantCard';

const API_URL = 'http://localhost:3005/api/restaurants';

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (query) => {
    setLoading(true);
    setError(null);
    try {
      let url = API_URL;
      if (query) url += `/search/${encodeURIComponent(query)}`;
      const response = await axios.get(url);
      setRestaurants(response.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch restaurants');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchData(searchQuery);
  };

  if (loading) return <Loading />;
  if (error) return <div className="container mt-3">Error: {error}</div>;

  return (
    <>
      <section className="bg-gradient-to-b from-[#FFFBF7] to-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent tracking-tight">
              Bolt Bite
            </h2>
            <p className="text-xs sm:text-sm text-orange-600 font-semibold mt-2 tracking-widest uppercase">
              Fast • Fresh • Delicious
            </p>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-3">
            Delicious food, <span className="text-orange-500">delivered fast</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mb-10">
            Order from your favorite restaurants and get fresh, hot meals delivered right to your door.
          </p>

          <div className="relative w-full max-w-3xl mb-8">
            <div className="absolute inset-0 bg-gradient-to-t from-orange-500 via-orange-300 to-transparent opacity-10 rounded-3xl blur-xl"></div>
            <div className="relative bg-white p-3 rounded-3xl shadow-lg shadow-orange-100/40 border border-gray-100 flex flex-col sm:flex-row gap-2 items-center">
              <div className="relative flex-1 w-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fas fa-search h-5 w-5 text-gray-400"></i>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-12 pr-4 py-3 sm:py-4 bg-transparent border-none focus:ring-0 text-gray-900 placeholder-gray-400 text-base focus:outline-none"
                  placeholder="What are you craving?"
                />
              </div>
              <div className="hidden sm:block w-px h-10 bg-gray-200"></div>
              <button
                onClick={() => handleSearch()}
                className="w-full sm:w-auto px-8 py-3 sm:py-4 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-all shadow-md hover:shadow-lg"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Popular near you</h2>
            <p className="text-gray-500">Handpicked favorites from top-rated restaurants</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.restaurantId || restaurant._id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </div>

      <div
        className="fixed top-0 right-0 -z-10 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-20"
        style={{ marginTop: '-200px', marginRight: '-200px' }}
      />
    </>
  );
}

export default RestaurantList;
