import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import EnhancedSearchBar from './EnhancedSearchBar';

const EnhancedNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (searchParams) => {
    // Handle search - you might want to navigate to search results or update state
    console.log('Search params:', searchParams);
    // This would typically navigate to a search results page or update the current view
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className={`enhanced-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="enhanced-nav-container">
          {/* Brand */}
          <Link to="/" className="enhanced-brand">
            <span className="brand-text">Bold Bite</span>
          </Link>

          {/* Centered Search Bar - Hidden on mobile */}
          <div className="enhanced-search-wrapper">
            <EnhancedSearchBar onSearch={handleSearch} className="navbar-search" />
          </div>

          {/* Navigation Links */}
          <div className="enhanced-nav-links">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>
            <Link to="/support" className="nav-link support-link">
              Support
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-content">
            {/* Mobile Search */}
            <div className="mobile-search">
              <EnhancedSearchBar onSearch={handleSearch} />
            </div>

            {/* Mobile Navigation Links */}
            <div className="mobile-nav-links">
              <Link
                to="/"
                className={`mobile-nav-link ${location.pathname === '/' ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <i className="fas fa-home"></i>
                Home
              </Link>
              <Link
                to="/support"
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <i className="fas fa-headset"></i>
                Support
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default EnhancedNavbar;