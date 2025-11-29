import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';

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
      if (newQty > 0) {
        const item = restaurant.menu?.find(m => m.name === itemName);
        return {
          ...prev,
          [itemName]: {
            quantity: newQty,
            price: item?.price || 0,
            image: item?.image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
            is_discounted: item?.is_discounted || false,
            discount_amount: item?.discount_amount || null
          }
        };
      } else {
        const newCart = { ...prev };
        delete newCart[itemName];
        return newCart;
      }
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

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Restaurant Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
          <div className="flex gap-4 text-sm text-gray-600">
            <span>🍽️ {restaurant.cuisines}</span>
            <span>⭐ {restaurant.aggregateRating || '4.5'}</span>
            <span>📍 {restaurant.votes || 0} ratings</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Menu Section (Left - 2/3 width) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Menu</h2>
              
              {Object.keys(groupedMenu).length === 0 ? (
                <p className="text-gray-500">No menu items available</p>
              ) : (
                Object.entries(groupedMenu).map(([category, items]) => (
                  <div key={category} className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-orange-500">
                      {category}
                    </h3>
                    <div className="space-y-3">
                      {Array.isArray(items) && items.map(item => (
                        <div key={item.name} className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                          
                          {/* Food Image - Top Left */}
                          <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                            <img 
                              src={item.image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop'}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop';
                              }}
                            />
                          </div>

                          {/* Item Details - Middle */}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-gray-900">{item.name}</h4>
                              <span className="text-xs">
                                {item.isVeg ? '🟢' : '🔴'}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{item.description || 'Delicious dish'}</p>
                            <div className="flex gap-2 mt-2">
                              <span className="text-sm font-semibold text-orange-600">₹{item.price}</span>
                              {item.is_discounted && (
                                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                                  🔥 {item.discount_amount}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Quantity Selector - Right */}
                          <div className="flex items-center gap-2">
                            {cart[item.name] ? (
                              <div className="flex items-center gap-2 bg-orange-500 text-white rounded-lg px-2 py-1">
                                <button
                                  onClick={() => handleQuantityChange(item.name, -1)}
                                  className="hover:opacity-80"
                                >
                                  −
                                </button>
                                <span className="w-6 text-center">{cart[item.name].quantity}</span>
                                <button
                                  onClick={() => handleQuantityChange(item.name, 1)}
                                  className="hover:opacity-80"
                                >
                                  +
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleQuantityChange(item.name, 1)}
                                className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition"
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

          {/* Cart Summary (Right - 1/3 width) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

              {Object.keys(cart).length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                    {Object.entries(cart).map(([itemName, itemData]) => (
                      <div key={itemName} className="flex justify-between text-sm border-b pb-2">
                        <span className="text-gray-700">
                          {itemName} × {itemData.quantity}
                        </span>
                        <span className="font-semibold text-gray-900">
                          ₹{(itemData.price || 0) * (itemData.quantity || 0)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Cutlery Option */}
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cutlery}
                        onChange={(e) => setCutlery(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">Include cutlery</span>
                    </label>
                  </div>

                  {/* Total */}
                  <div className="border-t-2 pt-4 mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">Subtotal</span>
                      <span className="font-semibold">₹{calculateTotal()}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">Delivery</span>
                      <span className="font-semibold">₹40</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-orange-600 bg-orange-50 p-2 rounded">
                      <span>Total</span>
                      <span>₹{calculateTotal() + 40}</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition"
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
