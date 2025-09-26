import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Restaurant from './models/restaurant.js';  // Note: .js extension is required in ES modules

const app = express();
const port = 3005;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/boltbite', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Routes in correct order
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// 1. Get all restaurants (static route)
app.get('/api/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. Filter restaurants (query parameters)
app.get('/api/restaurants/filter', async (req, res) => {
  try {
    const { cuisine, minRating, maxPrice } = req.query;
    let query = {};
    
    if (cuisine) {
      query.cuisines = { $regex: cuisine, $options: 'i' };
    }
    if (minRating) {
      query.aggregateRating = { $gte: parseFloat(minRating) };
    }
    if (maxPrice) {
      query.priceRange = { $lte: parseInt(maxPrice) };
    }
    
    const restaurants = await Restaurant.find(query);
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. Get restaurant by ID (must be last)
app.get('/api/restaurants/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const restaurant = await Restaurant.findOne({ restaurantId: id });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Server setup
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Error handling for server
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${port} is busy, trying ${port + 1}`);
    app.listen(port + 1, () => {
      console.log(`Server running on port ${port + 1}`);
    });
  } else {
    console.error('Server error:', err);
  }
});
