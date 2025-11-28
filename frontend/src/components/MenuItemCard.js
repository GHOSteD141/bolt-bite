import React from 'react';
import './MenuItemCard.css';

function MenuItemCard({ item, onAddToCart }) {
  const handleAddClick = () => {
    if (onAddToCart) {
      onAddToCart(item);
    }
  };

  const getVegIcon = () => {
    return item.isVeg ?
      <i className="fas fa-leaf" style={{ color: '#4caf50' }}></i> :
      <i className="fas fa-drumstick-bite" style={{ color: '#f44336' }}></i>;
  };

  const getDiscountBadge = () => {
    if (item.is_discounted) {
      return (
        <div className="discount-badge">
          {item.discount_amount}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="menu-item-card">
      <div className="menu-item-content">
        <div className="menu-item-left">
          <div className="menu-item-header">
            <h3 className="menu-item-name">
              {getVegIcon()}
              {item.name}
            </h3>
            {getDiscountBadge()}
          </div>
          <p className="menu-item-description">{item.description}</p>
          <div className="menu-item-meta">
            <div className="menu-item-time">
              <i className="fas fa-clock"></i>
              <span>• {item.preparation}</span>
            </div>
            <div className="menu-item-spice">
              <span className={`spice-level spice-${item.spiceLevel}`}>
                {item.spiceLevel.charAt(0).toUpperCase() + item.spiceLevel.slice(1)}
              </span>
            </div>
          </div>
          <div className="menu-item-price">
            ₹{item.price}
          </div>
        </div>
      </div>
      <div className="menu-item-right">
        <div className="menu-item-image-container">
          <img
            src={item.image}
            alt={item.name}
            className="menu-item-image"
            loading="lazy"
          />
        </div>
        <button
          className="menu-item-add-button"
          onClick={handleAddClick}
          aria-label={`Add ${item.name} to cart`}
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>
    </div>
  );
}

export default MenuItemCard;