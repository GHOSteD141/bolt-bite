import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { menuItems } from '../backend/data/menu.js';
import MenuItemCard from '../components/MenuItemCard';
import CartSidebar from '../components/CartSidebar';
import './RestaurantDetails.css';

function RestaurantDetails() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menuData, setMenuData] = useState({});
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);

  // Load restaurant and menu data
  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll use mock data based on restaurant ID
    const mockRestaurants = [
      {
        id: 1,
        name: "Pizza Paradise",
        cuisines: "Pizzas & Burgers",
        aggregateRating: 4.2,
        averageCostForTwo: 800,
        deliveryTime: "25-30 min",
        ImageURL: "https://source.unsplash.com/800x600/?pizzeria,italian-restaurant,wood-fired"
      },
      {
        id: 2,
        name: "Dragon House",
        cuisines: "Chinese & Fast Food",
        aggregateRating: 4.0,
        averageCostForTwo: 600,
        deliveryTime: "20-25 min",
        ImageURL: "https://source.unsplash.com/800x600/?chinese-restaurant,asian-cuisine,dim-sum"
      },
      {
        id: 3,
        name: "North Indian Delight",
        cuisines: "North Indian",
        aggregateRating: 4.5,
        averageCostForTwo: 900,
        deliveryTime: "30-35 min",
        ImageURL: "https://source.unsplash.com/800x600/?indian-restaurant,curry,butter-chicken"
      },
      {
        id: 4,
        name: "South Indian Express",
        cuisines: "South Indian",
        aggregateRating: 3.8,
        averageCostForTwo: 500,
        deliveryTime: "20-25 min",
        ImageURL: "https://source.unsplash.com/800x600/?south-indian,restaurant,dosa,idli"
      },
      {
        id: 5,
        name: "Street Food Corner",
        cuisines: "Snacks & Street Food",
        aggregateRating: 4.1,
        averageCostForTwo: 400,
        deliveryTime: "15-20 min",
        ImageURL: "https://source.unsplash.com/800x600/?street-food,indian-chaat,local-market"
      },
      {
        id: 6,
        name: "Sweet & Chill",
        cuisines: "Desserts & Beverages",
        aggregateRating: 4.3,
        averageCostForTwo: 600,
        deliveryTime: "15-20 min",
        ImageURL: "https://source.unsplash.com/800x600/?dessert-cafe,sweet-shop,ice-cream"
      },
      {
        id: 7,
        name: "Thali House",
        cuisines: "Combos & Meals",
        aggregateRating: 4.4,
        averageCostForTwo: 700,
        deliveryTime: "25-30 min",
        ImageURL: "https://source.unsplash.com/800x600/?indian-thali,traditional-meal,restaurant"
      }
    ];

    const foundRestaurant = mockRestaurants.find(r => r.id === parseInt(id));
    setRestaurant(foundRestaurant);

    // Load menu data for this restaurant
    if (foundRestaurant) {
      // Map restaurant cuisines to menu categories
      const cuisineToCategoryMap = {
        "Pizzas & Burgers": "Pizzas & Burgers",
        "Chinese & Fast Food": "Chinese & Fast Food",
        "North Indian": "North Indian",
        "South Indian": "South Indian",
        "Snacks & Street Food": "Snacks & Street Food",
        "Desserts & Beverages": "Desserts & Beverages",
        "Combos & Meals": "Combos & Meals"
      };

      const relevantCategories = Object.entries(cuisineToCategoryMap)
        .filter(([key, value]) => foundRestaurant.cuisines.includes(key))
        .map(([key, value]) => value);

      const filteredMenu = {};
      relevantCategories.forEach(category => {
        if (menuItems[category]) {
          filteredMenu[category] = menuItems[category];
        }
      });

      setMenuData(filteredMenu);
    }

    setLoading(false);
  }, [id]);

  // Cart management functions
  const addItemToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.name === item.name);
      if (existingItem) {
        // Increase quantity if item already exists
        return prevCart.map(cartItem =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
            : cartItem
        );
      } else {
        // Add new item with quantity 1
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
    setShowCart(true);
  };

  const removeItemFromCart = (itemName) => {
    setCart(prevCart => prevCart.filter(item => item.name !== itemName));
  };

  const updateItemQuantity = (itemName, quantity) => {
    if (quantity <= 0) {
      removeItemFromCart(itemName);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.name === itemName ? { ...item, quantity } : item
      )
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + (item.quantity || 1), 0);
  };

  const getDeliveryFee = () => {
    return cart.length > 0 ? 40 : 0; // ₹40 delivery fee
  };

  if (loading) {
    return (
      <div className="restaurant-details-loading">
        <div className="loading-spinner"></div>
        <p>Loading restaurant menu...</p>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="restaurant-not-found">
        <h2>Restaurant not found</h2>
        <p>The restaurant you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="restaurant-details">
      {/* Restaurant Header */}
      <div className="restaurant-header">
        <div className="restaurant-hero-image">
          <img
            src={restaurant.ImageURL}
            alt={restaurant.name}
            className="hero-img"
          />
          <div className="hero-overlay">
            <h1>{restaurant.name}</h1>
            <div className="hero-meta">
              <span className="rating">★ {restaurant.aggregateRating}</span>
              <span className="delivery-time">⏱ {restaurant.deliveryTime}</span>
              <span className="cost">₹{restaurant.averageCostForTwo} for two</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="menu-container">
        {Object.entries(menuData).map(([category, items]) => (
          <div key={category} className="menu-section">
            <h2 className="menu-section-title">{category}</h2>
            <div className="menu-grid">
              {items.map((item, index) => (
                <MenuItemCard
                  key={`${category}-${index}`}
                  item={item}
                  onAddToCart={addItemToCart}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Cart Sidebar */}
      {showCart && cart.length > 0 && (
        <CartSidebar
          cart={cart}
          onRemoveItem={removeItemFromCart}
          onUpdateQuantity={updateItemQuantity}
          onClose={() => setShowCart(false)}
          subtotal={getCartTotal()}
          deliveryFee={getDeliveryFee()}
          total={getCartTotal() + getDeliveryFee()}
        />
      )}
    </div>
  );
}

export default RestaurantDetails;
