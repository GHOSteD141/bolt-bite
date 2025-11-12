import React from 'react';
import { Link } from 'react-router-dom';

function RestaurantCard({ restaurant }) {
  return (
    <div className="restaurant-card">
      <div style={{ position: 'relative' }}>
        <img className="restaurant-image" src={restaurant.imageUrl || 'https://source.unsplash.com/800x600/?food'} alt={restaurant.name} />
        {restaurant.popular && <div className="badge-popular">Popular</div>}
      </div>
      <div className="card-body">
        <h3 className="card-title">{restaurant.name}</h3>
        <div className="card-sub">{restaurant.cuisines}</div>
        <div className="card-meta">
          <div className="rating">★ {restaurant.aggregateRating || '4.5'}</div>
          <div>• {restaurant.deliveryTime || '20-30 min'}</div>
          <div className="price">₹{restaurant.averageCostForTwo || 299}</div>
        </div>
        <button className="btn-add">Add to Cart</button>
      </div>
    </div>
  );
}

export default RestaurantCard;
