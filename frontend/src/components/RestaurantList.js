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
        url += `/search/${encodeURIComponent(searchParams.query)}`;
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
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-left">
            <h1 className="hero-title">Delicious food, <span style={{ color: 'var(--accent)' }}>delivered fast</span></h1>
            <p className="hero-sub">Order from your favorite restaurants and get fresh, hot meals delivered right to your door.</p>

            {/* Use the SearchBar component and wire up the handler */}
            <div className="hero-search">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
          <div className="hero-right">
            {/* decorative image placed via inline style so webpack won't try to resolve it */}
          </div>
        </div>

        {/* decorative cinematic image (right aligned) - uses public path /images/hero-food.svg
            inline style forces cover/position so the image is visible */}
        <div
          className="hero-deco"
          style={{
            backgroundImage: "url('/images/hero-food.svg')",
            backgroundSize: 'cover',
            backgroundPosition: 'right center'
          }}
          aria-hidden="true"
        />
      </section>

      <div className="container">
        <div className="section-heading">
          <h2>Popular near you</h2>
          <p>Handpicked favorites from top-rated restaurants</p>
        </div>

        <div className="restaurant-grid">
          {restaurants.map(restaurant => (
            <RestaurantCard key={restaurant.restaurantId} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </>
  );
}

export default RestaurantList;
