import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RestaurantList() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Placeholder data
  const restaurants = [
    {
      id: 1,
      name: "Golden Curry Cafe",
      image: "https://source.unsplash.com/800x600/?restaurant,food",
      cuisines: ["North Indian", "Chinese"],
      rating: 4.2,
      deliveryTime: "30-35",
      priceForTwo: 600
    },
    // Add more placeholder restaurants as needed
  ];

  return (
    <>
      <div className="search-bar">
        <div className="container">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search for restaurants, cuisine or a dish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="container">
        <div className="quick-filters">
          <button className="filter-btn">Rating 4.0+</button>
          <button className="filter-btn">Pure Veg</button>
          <button className="filter-btn">Less than 30 mins</button>
          <button className="filter-btn">₹300-₹600</button>
        </div>

        <h2 className="mb-4">Restaurants in your area</h2>
        <div className="row">
          {restaurants.map(restaurant => (
            <div key={restaurant.id} className="col-md-4 mb-4">
              <div className="restaurant-card card">
                <img 
                  src={restaurant.image} 
                  className="restaurant-image"
                  alt={restaurant.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{restaurant.name}</h5>
                  <div className="mb-2">
                    {restaurant.cuisines.map(cuisine => (
                      <span key={cuisine} className="cuisine-tag">{cuisine}</span>
                    ))}
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="rating-badge">★ {restaurant.rating}</span>
                    <span>{restaurant.deliveryTime} mins</span>
                    <span>₹{restaurant.priceForTwo} for two</span>
                  </div>
                  <Link to={`/restaurant/${restaurant.id}`} className="btn btn-outline-primary mt-3 w-100">
                    View Menu
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default RestaurantList;
