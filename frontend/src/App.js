import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RestaurantList from './components/RestaurantList';
import RestaurantDetails from './components/RestaurantDetails';
import Checkout from './components/Checkout';
import Support from './components/Support';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/components.css';

function App() {
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
            </Routes>
          </main>
        </ErrorBoundary>
        <Support />
      </div>
    </Router>
  );
}

export default App;
