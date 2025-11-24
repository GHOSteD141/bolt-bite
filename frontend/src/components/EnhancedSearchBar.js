import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const EnhancedSearchBar = ({ onSearch, className = '' }) => {
  const [query, setQuery] = useState('');
  const [dropdownResults, setDropdownResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const debounceRef = useRef(null);

  // Debounced search function
  const debouncedSearch = (searchQuery) => {
    if (searchQuery.length >= 3) {
      setIsLoading(true);

      // Clear previous debounce
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      // Set new debounce
      debounceRef.current = setTimeout(() => {
        performSearch(searchQuery);
      }, 300);
    } else {
      setDropdownResults(null);
      setShowDropdown(false);
    }
  };

  const performSearch = async (searchQuery) => {
    try {
      const response = await fetch(`http://localhost:3005/api/search/combined/${encodeURIComponent(searchQuery)}`);
      if (response.ok) {
        const data = await response.json();
        setDropdownResults(data);
        setShowDropdown(true);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleResultClick = (result, type) => {
    if (type === 'restaurant') {
      navigate(`/restaurant/${result.id}`);
    } else if (type === 'foodItem') {
      // Navigate to restaurant or show food item details
      if (result.restaurantId) {
        navigate(`/restaurant/${result.restaurantId}`);
      }
    }
    setShowDropdown(false);
    setQuery('');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch({ query: query.trim() });
      setShowDropdown(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setShowDropdown(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? <span key={index} style={{ color: 'var(--accent)', fontWeight: '600' }}>{part}</span> : part
    );
  };

  return (
    <div className={`enhanced-search-container ${className}`} ref={searchRef}>
      <form onSubmit={handleSearchSubmit} className="enhanced-search-form">
        <div className="enhanced-search-input-container">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search for restaurants or food items..."
            className="enhanced-search-input"
            onFocus={() => {
              if (query.length >= 3 && dropdownResults) {
                setShowDropdown(true);
              }
            }}
          />
          <button type="submit" className="enhanced-search-button" disabled={!query.trim()}>
            <i className="fas fa-search"></i>
          </button>
          {isLoading && (
            <div className="search-loading-spinner">
              <i className="fas fa-spinner fa-spin"></i>
            </div>
          )}
        </div>
      </form>

      {/* Search Dropdown */}
      {showDropdown && dropdownResults && (
        <div className="search-dropdown">
          {(dropdownResults.restaurants?.length > 0 || dropdownResults.foodItems?.length > 0) ? (
            <>
              {/* Restaurants Section */}
              {dropdownResults.restaurants?.length > 0 && (
                <div className="search-section">
                  <div className="search-section-header">
                    <i className="fas fa-store"></i>
                    Restaurants
                  </div>
                  <div className="search-results-grid">
                    {dropdownResults.restaurants.map((restaurant) => (
                      <div
                        key={restaurant.id}
                        className="search-result-item restaurant-result"
                        onClick={() => handleResultClick(restaurant, 'restaurant')}
                      >
                        <img
                          src={restaurant.image}
                          alt={restaurant.name}
                          className="search-result-image"
                          onError={(e) => {
                            e.target.src = '/images/placeholder-restaurant.jpg';
                          }}
                        />
                        <div className="search-result-content">
                          <div className="search-result-name">
                            {highlightText(restaurant.name, query)}
                          </div>
                          <div className="search-result-meta">
                            <span className="search-result-cuisine">{restaurant.cuisine}</span>
                            <span className="search-result-rating">
                              <i className="fas fa-star"></i> {restaurant.rating}
                            </span>
                            <span className="search-result-time">{restaurant.deliveryTime}</span>
                          </div>
                          <div className="search-result-price">
                            {'₹'.repeat(restaurant.priceRange)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Food Items Section */}
              {dropdownResults.foodItems?.length > 0 && (
                <div className="search-section">
                  <div className="search-section-header">
                    <i className="fas fa-utensils"></i>
                    Food Items
                  </div>
                  <div className="search-results-grid">
                    {dropdownResults.foodItems.map((foodItem) => (
                      <div
                        key={foodItem.id}
                        className="search-result-item food-item-result"
                        onClick={() => handleResultClick(foodItem, 'foodItem')}
                      >
                        <img
                          src={foodItem.image}
                          alt={foodItem.name}
                          className="search-result-image"
                          onError={(e) => {
                            e.target.src = '/images/placeholder-food.jpg';
                          }}
                        />
                        <div className="search-result-content">
                          <div className="search-result-name">
                            {highlightText(foodItem.name, query)}
                          </div>
                          <div className="search-result-meta">
                            <span className="search-result-restaurant">{foodItem.restaurant}</span>
                            <span className="search-result-time">{foodItem.prepTime}</span>
                            {foodItem.isVeg && (
                              <span className="search-result-veg">
                                <i className="fas fa-leaf"></i> Veg
                              </span>
                            )}
                          </div>
                          <div className="search-result-price">
                            ₹{foodItem.price}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="search-no-results">
              <i className="fas fa-search"></i>
              <p>No results found for "{query}"</p>
              <small>Try searching for a different restaurant or food item</small>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EnhancedSearchBar;