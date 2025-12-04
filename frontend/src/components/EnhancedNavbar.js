import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import EnhancedSearchBar from './EnhancedSearchBar';

const EnhancedNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (searchParams) => {
    // If EnhancedSearchBar submits { query }, navigate to home with query param
    if (searchParams && searchParams.query) {
      const q = encodeURIComponent(searchParams.query);
      navigate(`/?q=${q}`);
    }
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