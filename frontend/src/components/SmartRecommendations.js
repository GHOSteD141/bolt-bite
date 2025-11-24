import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RestaurantCard from './RestaurantCard';

const SmartRecommendations = ({ onCuisineSelect }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPersonalized, setIsPersonalized] = useState(false);
  const [personalizationReason, setPersonalizationReason] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      setIsLoading(true);

      // Check session storage for user preferences
      const sessionPreferences = sessionStorage.getItem('userCuisinePreferences');

      let endpoint = 'http://localhost:3005/api/recommendations/trending';

      if (sessionPreferences) {
        const preferences = JSON.parse(sessionPreferences);
        const cuisines = preferences.cuisines.join(',');
        endpoint = `http://localhost:3005/api/recommendations/personalized?cuisines=${cuisines}`;

        // Add other preferences if available
        if (preferences.maxPrice) {
          endpoint += `&maxPrice=${preferences.maxPrice}`;
        }
        if (preferences.minRating) {
          endpoint += `&minRating=${preferences.minRating}`;
        }
      }

      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        setRecommendations(data.recommendations || []);
        setIsPersonalized(data.isPersonalized || false);

        if (data.isPersonalized && data.preferences) {
          setPersonalizationReason(`Based on your interest in ${data.preferences.cuisines.join(', ')}`);

          // Store for potential future use
          if (data.preferences) {
            sessionStorage.setItem('userCuisinePreferences', JSON.stringify(data.preferences));
          }
        } else {
          setPersonalizationReason('');
        }
      }
    } catch (error) {
      console.error('Error loading recommendations:', error);
      // Fallback to empty state
      setRecommendations([]);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePreferences = (cuisineType) => {
    // Store the cuisine preference in session storage
    let preferences = {
      cuisines: [cuisineType],
      maxPrice: null,
      minRating: 3.5
    };

    // Try to extract existing preferences and update them
    const existingPreferences = sessionStorage.getItem('userCuisinePreferences');
    if (existingPreferences) {
      try {
        const parsed = JSON.parse(existingPreferences);
        preferences = {
          ...parsed,
          cuisines: [...new Set([...(parsed.cuisines || []), cuisineType])]
        };
      } catch (e) {
        console.error('Error parsing existing preferences:', e);
      }
    }

    sessionStorage.setItem('userCuisinePreferences', JSON.stringify(preferences));

    // Notify parent component if callback provided
    if (onCuisineSelect) {
      onCuisineSelect(cuisineType);
    }

    // Reload recommendations with new preferences
    loadRecommendations();
  };

  const handleRestaurantClick = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  const clearPersonalization = () => {
    sessionStorage.removeItem('userCuisinePreferences');
    setIsPersonalized(false);
    setPersonalizationReason('');
    loadRecommendations();
  };

  // Sample cuisine buttons for quick personalization
  const cuisineOptions = [
    { name: 'Italian', icon: '🍕', query: 'italian' },
    { name: 'Chinese', icon: '🥢', query: 'chinese' },
    { name: 'Indian', icon: '🍛', query: 'indian' },
    { name: 'Pizza', icon: '🍕', query: 'pizza' },
    { name: 'Burgers', icon: '🍔', query: 'burger' },
    { name: 'Healthy', icon: '🥗', query: 'healthy' }
  ];

  if (isLoading) {
    return (
      <section className="smart-recommendations-section">
        <div className="container">
          <div className="section-heading">
            <h2>Loading recommendations...</h2>
          </div>
          <div className="recommendations-loading">
            <div className="loading-spinner"></div>
          </div>
        </div>
      </section>
    );
  }

  if (recommendations.length === 0) {
    return null; // Don't show section if no recommendations
  }

  return (
    <section className="smart-recommendations-section">
      <div className="container">
        <div className="section-heading">
          <div className="section-header-content">
            <h2>
              {isPersonalized ? 'Recommended For You' : 'Trending Near You'}
            </h2>
            {isPersonalized && (
              <div className="personalization-badge">
                <i className="fas fa-user-circle"></i>
                <span>{personalizationReason}</span>
                <button
                  className="clear-personalization"
                  onClick={clearPersonalization}
                  title="Clear personalization"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            )}
          </div>
          <p>
            {isPersonalized
              ? 'Personalized recommendations based on your preferences'
              : 'Popular restaurants in your area'
            }
          </p>
        </div>

        {/* Cuisine Quick Select */}
        {!isPersonalized && (
          <div className="cuisine-quick-select">
            <p>What are you craving?</p>
            <div className="cuisine-buttons">
              {cuisineOptions.map((cuisine) => (
                <button
                  key={cuisine.query}
                  className="cuisine-button"
                  onClick={() => updatePreferences(cuisine.query)}
                >
                  <span className="cuisine-icon">{cuisine.icon}</span>
                  <span className="cuisine-name">{cuisine.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations Grid */}
        <div className="recommendations-grid">
          {recommendations.map((restaurant) => (
            <div
              key={restaurant.restaurantId}
              className="recommendation-card-wrapper"
              onClick={() => handleRestaurantClick(restaurant.restaurantId)}
            >
              <RestaurantCard restaurant={restaurant} />
              {restaurant.isPersonalized && (
                <div className="personalized-indicator">
                  <i className="fas fa-heart"></i>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {recommendations.length >= 8 && (
          <div className="show-more-container">
            <button
              className="show-more-button"
              onClick={() => navigate('/')}
            >
              View All Restaurants
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SmartRecommendations;