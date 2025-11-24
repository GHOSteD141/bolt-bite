import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EnhancedNavbar from './components/EnhancedNavbar';
import Footer from './components/Footer';
import RestaurantList from './components/RestaurantList';
import RestaurantDetails from './components/RestaurantDetails';
import ErrorBoundary from './components/ErrorBoundary';
import Support from './components/Support';
import './styles/components.css';

function App() {
  return (
    <Router>
      <div className="App">
        <EnhancedNavbar />
        <ErrorBoundary>
          <main className="main-content">
            <Routes>
              <Route path="/" element={<RestaurantList />} />
              <Route path="/restaurant/:id" element={<RestaurantDetails />} />
            </Routes>
          </main>
        </ErrorBoundary>
        <Footer />
        <Support />
      </div>
    </Router>
  );
}

export default App;
