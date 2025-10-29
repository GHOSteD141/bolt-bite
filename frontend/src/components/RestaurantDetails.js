import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function RestaurantDetails() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [cart, setCart] = useState({});
  const [cutlery, setCutlery] = useState(false);
  
  useEffect(() => {
    const fetchRestaurant = async () => {
      const response = await axios.get(`http://localhost:3005/api/restaurants/${id}`);
      setRestaurant(response.data);
    };
    fetchRestaurant();
  }, [id]);

  const handleQuantityChange = (itemName, delta) => {
    setCart(prev => ({
      ...prev,
      [itemName]: (prev[itemName] || 0) + delta
    }));
  };

  const calculateTotal = () => {
    if (!restaurant) return 0;
    return Object.entries(cart).reduce((total, [itemName, quantity]) => {
      const item = restaurant.menu.find(m => m.name === itemName);
      return total + (item?.price || 0) * quantity;
    }, 0);
  };

  if (!restaurant) return <div>Loading...</div>;

  return (
    <div className="restaurant-details">
      <div className="restaurant-header">
        <h1>{restaurant.name}</h1>
        <div className="restaurant-info">
          <span className="cuisine">{restaurant.cuisines}</span>
          <span className="rating">★ {restaurant.aggregateRating}</span>
          <span className="votes">({restaurant.votes} votes)</span>
        </div>
      </div>

      <div className="menu-cart-container">
        <div className="menu-section">
          {restaurant.menu && Object.entries(groupMenuByCategory(restaurant.menu)).map(([category, items]) => (
            <div key={category} className="menu-category">
              <h2>{category}</h2>
              <div className="menu-items">
                {Array.isArray(items) && items.map(item => (
                  <div key={item.name} className="menu-item-card">
                    <div className="item-info">
                      <h3>{item.name}</h3>
                      <p>₹{item.price}</p>
                      {item.isVeg ? 
                        <span className="veg-badge">🟢</span> : 
                        <span className="non-veg-badge">🔴</span>
                      }
                    </div>
                    <div className="quantity-selector">
                      <button onClick={() => handleQuantityChange(item.name, -1)}
                              disabled={!cart[item.name]}>-</button>
                      <span>{cart[item.name] || 0}</span>
                      <button onClick={() => handleQuantityChange(item.name, 1)}>+</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="cart-section">
          <div className="cart-container">
            <h2>Your Order</h2>
            {Object.entries(cart).map(([itemName, quantity]) => {
              if (quantity === 0) return null;
              const item = restaurant.menu.find(m => m.name === itemName);
              return (
                <div key={itemName} className="cart-item">
                  <span>{itemName} × {quantity}</span>
                  <span>₹{item.price * quantity}</span>
                </div>
              );
            })}
            <div className="cutlery-option">
              <label>
                <input
                  type="checkbox"
                  checked={cutlery}
                  onChange={(e) => setCutlery(e.target.checked)}
                />
                Include cutlery
              </label>
            </div>
            <div className="cart-total">
              <span>Total Amount:</span>
              <span>₹{calculateTotal()}</span>
            </div>
            <button className="checkout-button">Proceed to Checkout</button>
          </div>
        </div>
      </div>

      <div className="recommendations">
        <h2>Recommended Dishes</h2>
        <div className="recommended-dishes">
          {restaurant.popularDishes?.slice(0, 4).map(dish => (
            <div key={dish} className="recommended-dish-card">
              <h3>{dish}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Add this helper function at the top of the file
const groupMenuByCategory = (menu) => {
  if (!Array.isArray(menu)) return {};
  return menu.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});
};

export default RestaurantDetails;
