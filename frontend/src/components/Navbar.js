import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link className="brand" to="/">Bold Bite</Link>
        <div className="nav-links">
          <Link to="/">Restaurants</Link>
          <Link to="/howitworks">How it works</Link>
          <Link to="/about">About</Link>
        </div>
        <div className="nav-actions">
          <Link to="/login" style={{ marginRight: 12 }}>Log in</Link>
          <Link to="/signup" className="btn-add" style={{ padding: '8px 14px', background: 'var(--accent)', borderRadius: 10 }}>Sign up</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
