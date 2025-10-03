import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function RestaurantDetails() {
  const [restaurant, setRestaurant] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/restaurants/${id}`);
        setRestaurant(response.data);
      } catch (error) {
        console.error('Error fetching restaurant:', error);
      }
    };

    fetchRestaurant();
  }, [id]);

  if (!restaurant) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>{restaurant.name}</h2>
      <div className="card">
        <div className="card-body">
          <p>Cuisine: {restaurant.cuisines}</p>
          <p>Location: {restaurant.locality}</p>
          <p>Rating: {restaurant.aggregateRating}</p>
          <p>Price Range: {restaurant.priceRange}</p>
          <p>Online Delivery: {restaurant.hasOnlineDelivery ? 'Yes' : 'No'}</p>
          <p>Table Booking: {restaurant.hasTableBooking ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetails;
