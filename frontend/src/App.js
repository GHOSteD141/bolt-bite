import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RestaurantList from './components/RestaurantList';
import RestaurantDetails from './components/RestaurantDetails';
import ErrorBoundary from './components/ErrorBoundary';
import Support from './components/Support';
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
            </Routes>
          </main>
        </ErrorBoundary>
        <Support />
      </div>
    </Router>
  );
}

export default App;
