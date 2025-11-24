import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RestaurantCard({ restaurant, onClick }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Handle image load success
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Handle image load error
  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  // Get image source with fallback
  const getImageSrc = () => {
    if (imageError) return '/images/placeholder-restaurant.jpg';
    if (restaurant.image) return restaurant.image;
    if (restaurant.imageUrl) return restaurant.imageUrl;
    return 'https://source.unsplash.com/800x600/?food,restaurant';
  };

  // Get rating display
  const getRatingDisplay = () => {
    const rating = restaurant.rating || restaurant.aggregateRating || 4.0;
    return (
      <div className="rating">
        <i className="fas fa-star"></i>
        <span>{rating.toFixed(1)}</span>
      </div>
    );
  };

  // Get price display
  const getPriceDisplay = () => {
    const priceRange = restaurant.priceRange || Math.ceil((restaurant.averageCostForTwo || 300) / 150);
    return <div className="price">{'₹'.repeat(Math.min(priceRange, 4))}</div>;
  };

  // Get delivery time display
  const getDeliveryTimeDisplay = () => {
    return restaurant.deliveryTime || '20-30 min';
  };

  // Get cuisine tags
  const getCuisineTags = () => {
    const cuisines = restaurant.cuisines || restaurant.cuisine || [];
    const cuisineArray = Array.isArray(cuisines) ? cuisines : cuisines.split(',').map(c => c.trim());
    return cuisineArray.slice(0, 3); // Show max 3 cuisines
  };

  // Handle card click
  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`enhanced-restaurant-card ${imageLoaded ? 'loaded' : 'loading'}`}
      onClick={handleCardClick}
    >
      <div className="card-image-container">
        {/* Loading skeleton */}
        {!imageLoaded && <div className="image-skeleton"></div>}

        {/* Restaurant image */}
        <img
          className="restaurant-image"
          src={getImageSrc()}
          alt={restaurant.name}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
        />

        {/* Popular badge */}
        {restaurant.popular && (
          <div className="badge-popular">
            <i className="fas fa-fire"></i>
            Popular
          </div>
        )}

        {/* Fast delivery badge */}
        {restaurant.deliveryTime && (
          <div className="delivery-badge">
            <i className="fas fa-bolt"></i>
            Fast
          </div>
        )}

        {/* Hover overlay */}
        <div className="card-hover-overlay">
          <div className="overlay-content">
            <i className="fas fa-arrow-right"></i>
            <span>View Menu</span>
          </div>
        </div>
      </div>

      <div className="card-body">
        <div className="card-header">
          <h3 className="card-title">{restaurant.name}</h3>

          {/* Rating and price */}
          <div className="card-badges">
            {getRatingDisplay()}
            {getPriceDisplay()}
          </div>
        </div>

        {/* Cuisine tags */}
        <div className="cuisine-tags">
          {getCuisineTags().map((cuisine, index) => (
            <span key={index} className="cuisine-tag">
              {cuisine}
            </span>
          ))}
        </div>

        {/* Additional info */}
        <div className="card-info">
          <div className="info-item">
            <i className="fas fa-clock"></i>
            <span>{getDeliveryTimeDisplay()}</span>
          </div>
          {restaurant.locality && (
            <div className="info-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>{restaurant.locality}</span>
            </div>
          )}
        </div>

        {/* Card footer */}
        <div className="card-footer">
          <button className="btn-primary" onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}>
            <i className="fas fa-eye"></i>
            View Menu
          </button>

          {restaurant.isPersonalized && (
            <div className="personalized-indicator">
              <i className="fas fa-heart"></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RestaurantCard;
