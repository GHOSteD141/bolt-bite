import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RestaurantList from './components/RestaurantList';
import RestaurantDetails from './components/RestaurantDetails';
import Checkout from './components/Checkout';
import Support from './components/Support';
import SupportModal from './components/SupportModal';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
import Auth from './pages/Auth';
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
            </Routes>
          </main>
        </ErrorBoundary>
        <Support onSupportClick={() => setSupportOpen(true)} />
        <SupportModal isOpen={supportOpen} onClose={() => setSupportOpen(false)} />
      </div>
    </Router>
  );
}

export default App;
