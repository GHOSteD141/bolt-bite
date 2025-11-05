const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const restaurantRoutes = require('./routes/restaurantRoutes.cjs');
const Restaurant = require('./models/restaurant.cjs');
const path = require('path');

const app = express();
const port = 3005;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/boltbite', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4, // Add this line to force IPv4
}).then(() => {
  console.log('Connected to MongoDB...');
  // Test the connection by fetching a restaurant
  Restaurant.findOne({})
    .then(restaurant => {
      if (restaurant) {
        console.log('Successfully fetched a restaurant:', restaurant.name);
      } else {
        console.log('No restaurants found in the database.');
      }
    })
    .catch(err => {
      console.error('Error fetching restaurant:', err);
    });
})
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Routes
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Use restaurant routes
app.use('/api/restaurants', restaurantRoutes);

// Add CMS agent route
app.post('/agent-devlopment-kit-repo/cms-agent/chat', async (req, res) => {
  try {
    const agentResponse = await fetch('http://localhost:3000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await agentResponse.json();
    res.json(data);
  } catch (error) {
    console.error('Agent error:', error);
    res.status(500).json({ error: 'Failed to connect to agent' });
  }
});

// Server setup
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${port} is busy, trying ${port + 1}`);
    app.listen(port + 1, () => {
      console.log(`Server running on port ${port + 1}`);
    });
  } else {
    console.error('Server error:', err);
  }
});