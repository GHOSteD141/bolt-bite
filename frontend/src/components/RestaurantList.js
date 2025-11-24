import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import SmartRecommendations from './SmartRecommendations';
import Loading from './Loading';
import RestaurantCard from './RestaurantCard';

const API_URL = 'http://localhost:3005/api/restaurants';

function RestaurantList() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearchMode, setIsSearchMode] = useState(false);

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
        setIsSearchMode(true);
      } else {
        setIsSearchMode(false);
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

  const handleCuisineSelect = (cuisine) => {
    // Store cuisine preference for personalization
    const preferences = {
      cuisines: [cuisine],
      maxPrice: null,
      minRating: 3.5
    };
    sessionStorage.setItem('userCuisinePreferences', JSON.stringify(preferences));

    // Perform search with the cuisine
    handleSearch({ query: cuisine });
  };

  const handleRestaurantClick = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
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

      {/* Smart Recommendations - Only show when not in search mode */}
      {!isSearchMode && <SmartRecommendations onCuisineSelect={handleCuisineSelect} />}

      <div className="container">
        {/* Show different heading based on mode */}
        <div className="section-heading">
          <h2>
            {isSearchMode
              ? `Search Results (${restaurants.length})`
              : 'All Restaurants'
            }
          </h2>
          <p>
            {isSearchMode
              ? `Restaurants matching your search`
              : 'Browse all available restaurants in your area'
            }
          </p>
        </div>

        {/* Restaurant Grid */}
        {restaurants.length > 0 ? (
          <div className="restaurant-grid">
            {restaurants.map(restaurant => (
              <RestaurantCard
                key={restaurant.restaurantId || restaurant.id}
                restaurant={restaurant}
                onClick={() => handleRestaurantClick(restaurant.restaurantId || restaurant.id)}
              />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-content">
              <i className="fas fa-search"></i>
              <h3>No restaurants found</h3>
              <p>Try searching with different keywords or browse our recommendations above.</p>
              <button
                className="btn-primary"
                onClick={() => {
                  setIsSearchMode(false);
                  fetchData();
                }}
              >
                Browse All Restaurants
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default RestaurantList;
