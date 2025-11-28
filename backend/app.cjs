const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Suppress Mongoose deprecation warning
mongoose.set('strictQuery', false);

const SupportAgent = require('./agents/supportAgent');
const cmsAgent = require('./agents/cmsAgent');

const app = express();
const port = process.env.PORT || 3005;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/boltbite', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4
}).then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Initialize Support Agent
const supportAgent = new SupportAgent(process.env.GEMINI_API_KEY);

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend API is working!' });
});

// Use restaurant routes
const restaurantRoutes = require('./routes/restaurantRoutes.cjs');
app.use('/api/restaurants', restaurantRoutes);

// GET /api/menu - Get full menu
app.get('/api/menu', (req, res) => {
  try {
    const { category } = req.query;
    
    if (category) {
      const items = cmsAgent.getItemsByCategory(category);
      if (items.error) {
        return res.status(404).json({ success: false, error: items.error });
      }
      res.json({
        success: true,
        menu: items,
        category: category,
        timestamp: new Date().toISOString()
      });
    } else {
      res.json({
        success: true,
        menu: cmsAgent.getFullMenu(),
        summary: cmsAgent.getMenuSummary(),
        timestamp: new Date().toISOString()
      });
    }
  } catch (err) {
    console.error('Menu endpoint error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch menu' });
  }
});

// GET /api/recommendations/:itemName
app.get('/api/recommendations/:itemName', (req, res) => {
  try {
    const { itemName } = req.params;
    const suggestions = cmsAgent.getPairingSuggestions(itemName);
    
    if (suggestions.error) {
      return res.status(404).json({ success: false, error: suggestions.error });
    }

    res.json({
      success: true,
      ...suggestions,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Recommendations endpoint error:', err);
    res.status(500).json({ success: false, error: 'Failed to generate recommendations' });
  }
});

// POST /api/chat - AI chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Invalid message format'
      });
    }

    const response = await supportAgent.generateResponse(message);
    const discountedItems = cmsAgent.getDiscountedItems();

    res.json({
      success: true,
      response,
      menuContext: {
        discountedItems: discountedItems.items.slice(0, 3),
        hasDiscounts: discountedItems.count > 0,
        discountedCount: discountedItems.count
      },
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Chat endpoint error:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to process chat message',
      code: 'CHAT_ERROR'
    });
  }
});

// Server setup
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${port} is in use, trying ${port + 1}`);
    app.listen(port + 1);
  } else {
    console.error('Server error:', err);
  }
});