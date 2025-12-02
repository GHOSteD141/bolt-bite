import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/about-page.css';

function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <h1>About Bolt Bite</h1>
            <p>Delivering delicious food at lightning speed</p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-section">
        <div className="container">
          <div className="section-content">
            <div className="text-content">
              <h2>Our Mission</h2>
              <p>
                At Bolt Bite, we believe that everyone deserves access to great food, delivered fast. Our mission is to connect hungry customers with their favorite restaurants, making food delivery simple, quick, and reliable.
              </p>
              <p>
                We work tirelessly to ensure that every order is prepared with care and delivered with speed, all while supporting local restaurants and their communities.
              </p>
            </div>
            <div className="image-content">
              <div className="placeholder-image">🎯</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="about-section alternate">
        <div className="container">
          <div className="section-content">
            <div className="image-content">
              <div className="placeholder-image">📖</div>
            </div>
            <div className="text-content">
              <h2>Our Story</h2>
              <p>
                Bolt Bite started in 2023 with a simple idea: make food delivery faster and more convenient. What began as a small team of passionate food enthusiasts has grown into a platform serving thousands of customers across multiple cities.
              </p>
              <p>
                Our journey has been about innovation, reliability, and a genuine love for great food. Every day, we work to improve our service and expand our restaurant partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">⚡</div>
              <h3>Speed</h3>
              <p>Fast delivery without compromising quality</p>
            </div>
            <div className="value-card">
              <div className="value-icon">✨</div>
              <h3>Quality</h3>
              <p>Only partner with the best restaurants</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Trust</h3>
              <p>Transparent service you can rely on</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h3>Sustainability</h3>
              <p>Committed to eco-friendly practices</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2>Meet Our Team</h2>
          <p className="section-subtitle">Passionate individuals dedicated to delivering excellence</p>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">👨‍💼</div>
              <h3>Shreya Jit Beura</h3>
              <p>Co-Founder & CEO</p>
              <span className="member-bio">Visionary leader with 5+ years in food tech</span>
            </div>
            <div className="team-member">
              <div className="member-image">👩‍💼</div>
              <h3>Sarah Johnson</h3>
              <p>Co-Founder & CTO</p>
              <span className="member-bio">Tech expert driving innovation and growth</span>
            </div>
            <div className="team-member">
              <div className="member-image">👨‍🍳</div>
              <h3>Marcus Chef</h3>
              <p>Operations Manager</p>
              <span className="member-bio">Ensuring quality partnerships and service</span>
            </div>
            <div className="team-member">
              <div className="member-image">👩‍💻</div>
              <h3>Emily Tech</h3>
              <p>Product Lead</p>
              <span className="member-bio">Building features customers love</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <h3>500+</h3>
              <p>Partner Restaurants</p>
            </div>
            <div className="stat-card">
              <h3>50K+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat-card">
              <h3>100K+</h3>
              <p>Orders Delivered</p>
            </div>
            <div className="stat-card">
              <h3>4.8★</h3>
              <p>Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <h2>Ready to Order?</h2>
          <p>Experience the fastest food delivery service today</p>
          <Link to="/" className="cta-btn">Start Exploring</Link>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
