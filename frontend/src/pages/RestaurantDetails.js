import React from 'react';
import { useParams } from 'react-router-dom';

function RestaurantDetails() {
  const { id } = useParams();

  return (
    <div>
      <h1>Restaurant Details for ID: {id}</h1>
    </div>
  );
}

export default RestaurantDetails;
