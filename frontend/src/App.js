import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RestaurantList from './components/RestaurantList';
import RestaurantDetails from './components/RestaurantDetails';
import Checkout from './components/Checkout';
import Support from './components/Support';
import SupportModal from './components/SupportModal';
import Footer from './components/Footer';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
import Auth from './pages/Auth';
import Restaurants from './pages/Restaurants';
import AuthPage from './pages/AuthPage';
import AboutPage from './pages/AboutPage';
import FooterPages from './pages/FooterPages';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/components.css';

function App() {
  const [supportOpen, setSupportOpen] = useState(false);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <ErrorBoundary>
          <main>
            <Routes>
              <Route path="/" element={<RestaurantList />} />
              <Route path="/restaurant/:id" element={<RestaurantDetails />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/about" element={<About />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/restaurants" element={<Restaurants />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/about-us" element={<AboutPage />} />
              
              {/* Help Routes */}
              <Route path="/help/faq" element={<FooterPages />} />
              <Route path="/help/contact" element={<FooterPages />} />
              <Route path="/help/order-tracking" element={<FooterPages />} />
              <Route path="/help/payment-issues" element={<FooterPages />} />
              <Route path="/help/account" element={<FooterPages />} />
              
              {/* Safety Routes */}
              <Route path="/safety/food-safety" element={<FooterPages />} />
              <Route path="/safety/contactless-delivery" element={<FooterPages />} />
              <Route path="/safety/delivery-partners" element={<FooterPages />} />
              <Route path="/safety/covid-info" element={<FooterPages />} />
              <Route path="/safety/emergency" element={<FooterPages />} />
              
              {/* Terms Routes */}
              <Route path="/terms/service" element={<FooterPages />} />
              <Route path="/terms/user-agreement" element={<FooterPages />} />
              <Route path="/terms/restaurant-terms" element={<FooterPages />} />
              <Route path="/terms/delivery-terms" element={<FooterPages />} />
              <Route path="/terms/refund-policy" element={<FooterPages />} />
              
              {/* Privacy Routes */}
              <Route path="/privacy/privacy-policy" element={<FooterPages />} />
              <Route path="/privacy/data-protection" element={<FooterPages />} />
              <Route path="/privacy/cookie-policy" element={<FooterPages />} />
              <Route path="/privacy/gdpr" element={<FooterPages />} />
              <Route path="/privacy/your-choices" element={<FooterPages />} />
              
              {/* Bottom Footer Routes */}
              <Route path="/accessibility" element={<FooterPages />} />
              <Route path="/sitemap" element={<FooterPages />} />
              <Route path="/careers" element={<FooterPages />} />
              <Route path="/press" element={<FooterPages />} />
            </Routes>
          </main>
        </ErrorBoundary>
        <Support onSupportClick={() => setSupportOpen(true)} />
        <SupportModal isOpen={supportOpen} onClose={() => setSupportOpen(false)} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
