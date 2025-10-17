import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    cuisine: '',
    priceRange: '',
    rating: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ query, ...filters });
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="search-section">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for restaurants or cuisines..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div className="filter-container">
          <select 
            name="cuisine" 
            value={filters.cuisine}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">All Cuisines</option>
            <option value="indian">Indian</option>
            <option value="chinese">Chinese</option>
            <option value="italian">Italian</option>
          </select>
          <select 
            name="priceRange" 
            value={filters.priceRange}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">Any Price</option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
          </select>
          <select 
            name="rating" 
            value={filters.rating}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">Any Rating</option>
            <option value="4">4+ ★</option>
            <option value="3">3+ ★</option>
            <option value="2">2+ ★</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
