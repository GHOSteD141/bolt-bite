import React, { useState } from 'react';
import '../styles/auth-page.css';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    address: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      }
      if (!formData.address) {
        newErrors.address = 'Address is required';
      }
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      console.log('Form submitted:', formData);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          email: '',
          password: '',
          name: '',
          phone: '',
          address: ''
        });
      }, 3000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>{isLogin ? 'Welcome Back' : 'Join Bolt Bite'}</h1>
            <p>{isLogin ? 'Sign in to your account' : 'Create a new account'}</p>
          </div>

          {submitted && (
            <div className="success-message">
              ✓ {isLogin ? 'Login successful!' : 'Account created successfully!'}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="address">Delivery Address</label>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    placeholder="123 Main St, City, State"
                    value={formData.address}
                    onChange={handleChange}
                    className={errors.address ? 'error' : ''}
                  />
                  {errors.address && <span className="error-message">{errors.address}</span>}
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <button type="submit" className="submit-btn">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <div className="social-auth">
            <button className="social-btn google-btn">
              <span>Google</span>
            </button>
            <button className="social-btn facebook-btn">
              <span>Facebook</span>
            </button>
          </div>

          <div className="auth-footer">
            <p>
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                className="toggle-btn"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrors({});
                  setFormData({
                    email: '',
                    password: '',
                    name: '',
                    phone: '',
                    address: ''
                  });
                }}
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>

        <div className="auth-benefits">
          <h2>Why Join Bolt Bite?</h2>
          <div className="benefits-list">
            <div className="benefit-item">
              <div className="benefit-icon">🚀</div>
              <h3>Fast Delivery</h3>
              <p>Get your food delivered in 30 minutes or less</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🍽️</div>
              <h3>Wide Selection</h3>
              <p>Choose from hundreds of restaurants and cuisines</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">💰</div>
              <h3>Exclusive Deals</h3>
              <p>Get special discounts and offers for members</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">⭐</div>
              <h3>Quality Guaranteed</h3>
              <p>Verified restaurants and reliable service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
