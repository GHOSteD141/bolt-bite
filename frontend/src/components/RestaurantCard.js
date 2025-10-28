import React from 'react';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="restaurant-card">
      <img 
        src={restaurant.imageUrl || 'https://via.placeholder.com/300x200'} 
        alt={restaurant.name}
        className="restaurant-image"
      />
      <div className="restaurant-info">
        <h3 className="restaurant-name">{restaurant.name}</h3>
        <p className="restaurant-cuisine">{restaurant.cuisines}</p>
        <div className="restaurant-details">
          <span className="rating-badge">★ {restaurant.aggregateRating}</span>
          <span className="price-badge">₹{restaurant.averageCostForTwo} for two</span>
        </div>
        <Link to={`/restaurant/${restaurant.restaurantId}`}>
          <button className="action-button">Order Now</button>
        </Link>
      </div>
    </div>
  );
};

export default RestaurantCard;
