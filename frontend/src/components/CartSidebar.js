import React from 'react';
import './CartSidebar.css';

function CartSidebar({ cart, onRemoveItem, onUpdateQuantity, onClose, subtotal, deliveryFee, total }) {
  const handleQuantityChange = (itemName, change) => {
    const item = cart.find(item => item.name === itemName);
    if (item) {
      const newQuantity = (item.quantity || 1) + change;
      onUpdateQuantity(itemName, newQuantity);
    }
  };

  const handleRemoveClick = (itemName) => {
    onRemoveItem(itemName);
  };

  return (
    <div className="cart-sidebar">
      <div className="cart-content">
        {/* Cart Header */}
        <div className="cart-header">
          <h3>Your Order</h3>
          <button className="cart-close-button" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Cart Items */}
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <i className="fas fa-shopping-cart"></i>
              <p>Your cart is empty</p>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={`${item.name}-${index}`} className="cart-item">
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">₹{item.price}</div>
                </div>
                <div className="cart-item-controls">
                  <div className="quantity-controls">
                    <button
                      className="quantity-button"
                      onClick={() => handleQuantityChange(item.name, -1)}
                      aria-label="Decrease quantity"
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <span className="quantity-display">{item.quantity || 1}</span>
                    <button
                      className="quantity-button"
                      onClick={() => handleQuantityChange(item.name, 1)}
                      aria-label="Increase quantity"
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                  <button
                    className="cart-item-remove"
                    onClick={() => handleRemoveClick(item.name)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button className="checkout-button">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartSidebar;