import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';
import '../styles/restaurant-details.css';

const API_URL = 'http://localhost:3005/api/restaurants';

function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState({});
  const [cutlery, setCutlery] = useState(false);

  useEffect(() => {
    const fetchRestaurant = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setRestaurant(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching restaurant:', err);
        setError(err.message || 'Failed to load restaurant details');
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [id]);

  const handleQuantityChange = (itemName, delta) => {
    setCart(prev => {
      const newQty = (prev[itemName] || 0) + delta;
      if (newQty > 0 && newQty <= 32) {
        const item = restaurant.menu?.find(m => m.name === itemName);
        return {
          ...prev,
          [itemName]: {
            quantity: newQty,
            price: item?.price || 0,
            image: item?.image || getPlaceholderImage(item.category, item.isVeg),
            is_discounted: item?.is_discounted || false,
            discount_amount: item?.discount_amount || null
          }
        };
      } else if (newQty <= 0) {
        const newCart = { ...prev };
        delete newCart[itemName];
        return newCart;
      }
      return prev;
    });
  };

  const calculateTotal = () => {
    if (!restaurant) return 0;
    return Object.entries(cart).reduce((total, [itemName, itemData]) => {
      return total + (itemData.price || 0) * (itemData.quantity || 0);
    }, 0);
  };

  const groupMenuByCategory = (menu) => {
    if (!Array.isArray(menu)) return {};
    return menu.reduce((acc, item) => {
      const category = item.category || 'Other';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});
  };

  const handleCheckout = () => {
    // Save cart to localStorage
    const cartForStorage = Object.entries(cart).map(([name, data]) => ({
      name,
      ...data
    }));
    localStorage.setItem('cartItems', JSON.stringify(cartForStorage));
    navigate('/checkout');
  };

  if (loading) return <Loading />;
  if (error) return <div className="container mx-auto p-4 text-red-600">Error: {error}</div>;
  if (!restaurant) return <div className="container mx-auto p-4">Restaurant not found</div>;

  const groupedMenu = groupMenuByCategory(restaurant.menu);

  const getPlaceholderImage = (category, isVeg) => {
    // Pick more relevant placeholder based on category or veg/non-veg
    if (!category) category = '';
    const c = category.toLowerCase();
    if (c.includes('pizza') || c.includes('italian')) return 'https://source.unsplash.com/400x300/?pizza';
    if (c.includes('chinese')) return 'https://source.unsplash.com/400x300/?chinese-food';
    if (c.includes('burger') || c.includes('american')) return 'https://source.unsplash.com/400x300/?burger';
    if (c.includes('dessert')) return 'https://source.unsplash.com/400x300/?dessert';
    if (c.includes('beverage')) return 'https://source.unsplash.com/400x300/?drink';
    if (c.includes('momos')) return 'https://source.unsplash.com/400x300/?momos';
    // Veg vs Non-veg fallback
    return isVeg ? 'https://source.unsplash.com/400x300/?vegetarian' : 'https://source.unsplash.com/400x300/?chicken';
  };

  return (
    <div className="restaurant-details-page">
      {/* Hero Banner */}
      <div className="restaurant-hero-banner">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-badge">🏆 Premium Partner</div>
          <h1 className="hero-title">{restaurant.name}</h1>
          <p className="hero-subtitle">Delicious food, fast delivery</p>
        </div>
      </div>

      {/* Restaurant Header Info */}
      <div className="restaurant-header-info">
        <div className="container mx-auto px-4">
          <div className="info-grid">
            {/* Rating */}
            <div className="info-card">
              <div className="info-icon">⭐</div>
              <div className="info-content">
                <div className="info-label">Rating</div>
                <div className="info-value">{restaurant.aggregateRating || '4.5'}</div>
              </div>
            </div>

            {/* Cuisine */}
            <div className="info-card">
              <div className="info-icon">🍽️</div>
              <div className="info-content">
                <div className="info-label">Cuisine</div>
                <div className="info-value">{restaurant.cuisines}</div>
              </div>
            </div>

            {/* Reviews */}
            <div className="info-card">
              <div className="info-icon">💬</div>
              <div className="info-content">
                <div className="info-label">Reviews</div>
                <div className="info-value">{restaurant.votes || 0}</div>
              </div>
            </div>

            {/* Delivery Time */}
            <div className="info-card">
              <div className="info-icon">🚚</div>
              <div className="info-content">
                <div className="info-label">Delivery</div>
                <div className="info-value">30-45 min</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Menu Section (Left - 60% width) */}
          <div className="lg:col-span-2">
            <div className="menu-card">
              <div className="menu-header">
                <h2 className="menu-title">🍴 Menu</h2>
                <span className="item-count">{Object.values(groupedMenu).flat().length} items</span>
              </div>
              
              {Object.keys(groupedMenu).length === 0 ? (
                <p className="text-gray-500">No menu items available</p>
              ) : (
                Object.entries(groupedMenu).map(([category, items]) => (
                  <div key={category} className="mb-8">
                    <div className="category-header">
                      {category.toLowerCase() === 'american' && (
                        <img
                          src={'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop'}
                          alt="burger"
                          className="category-icon"
                        />
                      )}
                      <h3 className="category-title">{category}</h3>
                    </div>
                    <div className="menu-items-list">
                      {Array.isArray(items) && items.map(item => (
                        <div key={item.name} className="menu-item">
                          
                          {/* Food Image */}
                          <div className="item-image">
                            <img 
                              src={
                                (item.image || getPlaceholderImage(item.category, item.isVeg)) + `?v=${Date.now()}`
                              }
                              alt={item.name}
                              onError={(e) => {
                                e.target.src = getPlaceholderImage(item.category, item.isVeg);
                              }}
                            />
                          </div>

                          {/* Debug: print item image to console */}
                          {console.log('Menu Item:', item.name, 'image:', item.image)}
                          {/* Item Details */}
                          <div className="item-details">
                            <div>
                              <div className="item-header">
                                <h4 className="item-name">{item.name}</h4>
                                <div className={`veg-badge ${item.isVeg ? 'veg' : 'non-veg'}`}>
                                  {item.isVeg ? 'Veg' : 'Non Veg'}
                                </div>
                              </div>
                              <p className="item-description">{item.description || 'Delicious dish'}</p>
                            </div>
                            <div className="item-footer">
                              <span className="item-price">₹{item.price}</span>
                              {item.is_discounted && (
                                <span className="discount-badge">
                                  🔥 {item.discount_amount}% off
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Quantity Selector */}
                          <div className="quantity-selector">
                            {cart[item.name] ? (
                              <div className="flex items-center bg-orange-500 text-white rounded-lg">
                                <button
                                  onClick={() => handleQuantityChange(item.name, -1)}
                                  className="qty-button"
                                >
                                  −
                                </button>
                                <span className="qty-display">{cart[item.name].quantity}</span>
                                <button
                                  onClick={() => handleQuantityChange(item.name, 1)}
                                  className="qty-button"
                                >
                                  +
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleQuantityChange(item.name, 1)}
                                className="add-button"
                              >
                                Add
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Cart Summary (Right - 40% width) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8 sticky top-4 h-fit">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

              {Object.keys(cart).length === 0 ? (
                <p className="text-gray-500 text-center py-12">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6 max-h-96 overflow-y-auto border rounded-lg p-4 bg-gray-50">
                    {Object.entries(cart).map(([itemName, itemData]) => (
                      <div key={itemName} className="flex justify-between text-base border-b pb-3 last:border-b-0">
                        <div className="flex-1">
                          <span className="text-gray-800 font-medium block">{itemName}</span>
                          <span className="text-sm text-gray-600">Qty: {itemData.quantity}</span>
                        </div>
                        <span className="font-bold text-gray-900 text-lg">
                          ₹{(itemData.price || 0) * (itemData.quantity || 0)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Cutlery Option */}
                  <div className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cutlery}
                        onChange={(e) => setCutlery(e.target.checked)}
                        className="w-5 h-5 accent-orange-500"
                      />
                      <span className="text-base text-gray-700 font-medium">Include cutlery</span>
                    </label>
                  </div>

                  {/* Total */}
                  <div className="border-t-2 pt-6 mb-6 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-700 text-lg">Subtotal</span>
                      <span className="font-bold text-lg">₹{calculateTotal()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700 text-lg">Delivery</span>
                      <span className="font-bold text-lg">₹40</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-orange-600 bg-orange-50 p-4 rounded-lg border-2 border-orange-200">
                      <span>Total</span>
                      <span>₹{calculateTotal() + 40}</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-orange-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-orange-600 transition"
                  >
                    Proceed to Checkout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetails;
