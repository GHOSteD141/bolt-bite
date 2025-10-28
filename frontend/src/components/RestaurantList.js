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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (searchParams = {}) => {
    setLoading(true);
    setError(null);
    try {
      let url = API_URL;
      if (searchParams && searchParams.query) {
        url += `/search/${searchParams.query}`;
      }

      const response = await axios.get(url);
      setRestaurants(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to fetch restaurants');
      setLoading(false);
    }
  };

  const handleSearch = (searchParams) => {
    fetchData(searchParams);
  };

  if (loading) return <Loading />;
  if (error) return <div className="container mt-3">Error: {error}</div>;

  return (
    <div>
      <div className="search-section">
        <div className="container">
          <SearchBar onSearch={handleSearch} />
          <div className="filter-options">
            <select className="filter-select">
              <option>All Cuisines</option>
              <option>North Indian</option>
              <option>Chinese</option>
              <option>Italian</option>
            </select>
            <select className="filter-select">
              <option>Price Range</option>
              <option>₹0-500</option>
              <option>₹500-1000</option>
              <option>₹1000+</option>
            </select>
            <select className="filter-select">
              <option>Rating</option>
              <option>4.5+</option>
              <option>4.0+</option>
              <option>3.5+</option>
            </select>
          </div>
        </div>
      </div>
      <div className="container">
        <h2>Restaurants in your area</h2>
        <div className="restaurant-grid">
          {restaurants.map(restaurant => (
            <RestaurantCard key={restaurant.restaurantId} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RestaurantList;
