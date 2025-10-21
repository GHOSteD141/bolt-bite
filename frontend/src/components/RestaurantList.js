import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './SearchBar';
import Loading from './Loading';

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
    <div className="container mt-4">
      <SearchBar onSearch={handleSearch} />
      <h2>Restaurants in your area</h2>
      <div className="row">
        {restaurants.map(restaurant => (
          <div key={restaurant.restaurantId} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{restaurant.name}</h5>
                <p className="card-text">{restaurant.cuisines}</p>
                <p className="card-text">Rating: {restaurant.aggregateRating}</p>
                <Link to={`/restaurant/${restaurant.restaurantId}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestaurantList;
