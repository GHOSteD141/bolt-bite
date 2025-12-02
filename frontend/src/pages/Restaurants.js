import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RestaurantCard from '../components/RestaurantCard';
import axios from 'axios';
import '../styles/restaurants.css';

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/restaurants');
      setRestaurants(response.data);
      setFilteredRestaurants(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = restaurants;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.cuisine.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by cuisine
    if (selectedCuisine !== 'All') {
      filtered = filtered.filter(restaurant =>
        restaurant.cuisine.includes(selectedCuisine)
      );
    }

    // Sort
    if (sortBy === 'rating') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'delivery-time') {
      filtered.sort((a, b) => (a.deliveryTime || 0) - (b.deliveryTime || 0));
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredRestaurants(filtered);
  }, [searchTerm, selectedCuisine, sortBy, restaurants]);

  const cuisines = ['All', ...new Set(restaurants.flatMap(r => r.cuisine || []))];

  if (loading) {
    return <div className="restaurants-page"><div className="loading">Loading restaurants...</div></div>;
  }

  return (
    <div className="restaurants-page">
      <div className="restaurants-header">
        <div className="container">
          <h1>Explore Our Restaurants</h1>
          <p>Discover and order from our partner restaurants</p>
        </div>
      </div>

      <div className="container restaurants-container">
        <div className="restaurants-sidebar">
          <div className="filter-card">
            <h3>Search</h3>
            <input
              type="text"
              placeholder="Search restaurants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-card">
            <h3>Cuisines</h3>
            <div className="cuisine-filters">
              {cuisines.map(cuisine => (
                <label key={cuisine} className="cuisine-label">
                  <input
                    type="radio"
                    name="cuisine"
                    value={cuisine}
                    checked={selectedCuisine === cuisine}
                    onChange={(e) => setSelectedCuisine(e.target.value)}
                  />
                  <span>{cuisine}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-card">
            <h3>Sort By</h3>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
              <option value="rating">Rating (High to Low)</option>
              <option value="delivery-time">Delivery Time</option>
              <option value="name">Name (A to Z)</option>
            </select>
          </div>
        </div>

        <div className="restaurants-grid">
          <div className="results-info">
            <p>Showing {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''}</p>
          </div>

          {filteredRestaurants.length > 0 ? (
            <div className="grid">
              {filteredRestaurants.map(restaurant => (
                <Link key={restaurant._id} to={`/restaurant/${restaurant._id}`} className="restaurant-link">
                  <RestaurantCard restaurant={restaurant} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>No restaurants found</h3>
              <p>Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Restaurants;
