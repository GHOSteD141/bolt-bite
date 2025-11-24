import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="enhanced-footer">
      <div className="container">
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <h3>Bold Bite</h3>
            <p>Delicious food, delivered fast. Your favorite restaurants and cuisines, right at your doorstep.</p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Help Section */}
          <div className="footer-section">
            <h4>Help</h4>
            <ul className="footer-links">
              <li>
                <Link to="/help/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/help/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/help/order-tracking">Order Tracking</Link>
              </li>
              <li>
                <Link to="/help/payment-issues">Payment Issues</Link>
              </li>
              <li>
                <Link to="/help/account">Account Help</Link>
              </li>
            </ul>
          </div>

          {/* Safety Section */}
          <div className="footer-section">
            <h4>Safety</h4>
            <ul className="footer-links">
              <li>
                <Link to="/safety/food-safety">Food Safety</Link>
              </li>
              <li>
                <Link to="/safety/contactless-delivery">Contactless Delivery</Link>
              </li>
              <li>
                <Link to="/safety/delivery-partners">Delivery Partner Safety</span>
              </li>
              <li>
                <Link to="/safety/covid-info">COVID-19 Information</Link>
              </li>
              <li>
                <Link to="/safety/emergency">Emergency Guidelines</Link>
              </li>
            </ul>
          </div>

          {/* Terms Section */}
          <div className="footer-section">
            <h4>Terms</h4>
            <ul className="footer-links">
              <li>
                <Link to="/terms/service">Terms of Service</Link>
              </li>
              <li>
                <Link to="/terms/user-agreement">User Agreement</Link>
              </li>
              <li>
                <Link to="/terms/restaurant-terms">Restaurant Terms</Link>
              </li>
              <li>
                <Link to="/terms/delivery-terms">Delivery Terms</Link>
              </li>
              <li>
                <Link to="/terms/refund-policy">Refund Policy</Link>
              </li>
            </ul>
          </div>

          {/* Privacy Section */}
          <div className="footer-section">
            <h4>Privacy</h4>
            <ul className="footer-links">
              <li>
                <Link to="/privacy/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/privacy/data-protection">Data Protection</Link>
              </li>
              <li>
                <Link to="/privacy/cookie-policy">Cookie Policy</Link>
              </li>
              <li>
                <Link to="/privacy/gdpr">GDPR Rights</Link>
              </li>
              <li>
                <Link to="/privacy/your-choices">Your Privacy Choices</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; {currentYear} Bold Bite. All rights reserved.</p>
            </div>
            <div className="footer-bottom-links">
              <Link to="/accessibility">Accessibility</Link>
              <span className="separator">•</span>
              <Link to="/sitemap">Sitemap</Link>
              <span className="separator">•</span>
              <Link to="/careers">Careers</Link>
              <span className="separator">•</span>
              <Link to="/press">Press</Link>
            </div>
            <div className="app-badges">
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="app-badge">
                <i className="fab fa-google-play"></i>
                <span>Get it on<br/>Google Play</span>
              </a>
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="app-badge">
                <i className="fab fa-app-store"></i>
                <span>Download on<br/>App Store</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;