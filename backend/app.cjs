const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const restaurantRoutes = require('./routes/restaurantRoutes.cjs');
const Restaurant = require('./models/restaurant.cjs');
const path = require('path');
require('dotenv').config();

// Import AI agents
const CMSAgent = require('./agents/cmsAgent');
const SupportAgent = require('./agents/supportAgent');

const app = express();
const port = process.env.PORT || 3005;

// Initialize AI agents
let cmsAgent = null;
let supportAgent = null;

try {
  cmsAgent = new CMSAgent();
  supportAgent = new SupportAgent();
  console.log('AI Agents initialized successfully');
} catch (error) {
  console.error('Failed to initialize AI agents:', error.message);
}

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

// Enhanced /api/chat endpoint with AI agent integration
app.post('/api/chat', async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    // Validate request
    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        error: "Message is required and must be a string",
        code: "INVALID_MESSAGE",
        timestamp: new Date().toISOString()
      });
    }

    // Check if Support Agent is available
    if (!supportAgent) {
      return res.status(503).json({
        success: false,
        error: "AI service temporarily unavailable",
        code: "AI_SERVICE_UNAVAILABLE",
        timestamp: new Date().toISOString(),
        retry: true
      });
    }

    // Generate AI response
    const aiResponse = await supportAgent.generateResponse(message, sessionId);

    if (aiResponse.success) {
      res.json({
        success: true,
        response: aiResponse.response,
        menuContext: aiResponse.menuContext,
        suggestions: aiResponse.suggestions || [],
        pairings: aiResponse.pairings || [],
        timestamp: aiResponse.timestamp,
        sessionId: aiResponse.sessionId
      });
    } else {
      // Handle AI service errors with fallback
      res.status(503).json({
        success: false,
        error: aiResponse.error || "AI service temporarily unavailable",
        code: "AI_GENERATION_FAILED",
        fallbackResponse: aiResponse.fallbackResponse,
        menuContext: aiResponse.menuContext,
        timestamp: aiResponse.timestamp,
        retry: aiResponse.retry || true
      });
    }

  } catch (error) {
    console.error('Chat AI Agent error:', error);
    res.status(500).json({
      success: false,
      error: "Internal server error processing your request",
      code: "INTERNAL_ERROR",
      timestamp: new Date().toISOString()
    });
  }
});

// GET /api/menu endpoint for direct menu access
app.get('/api/menu', async (req, res) => {
  try {
    const { category } = req.query;

    if (!cmsAgent) {
      return res.status(503).json({
        success: false,
        error: "Menu service temporarily unavailable",
        code: "CMS_SERVICE_UNAVAILABLE",
        timestamp: new Date().toISOString()
      });
    }

    let menuData;
    if (category) {
      menuData = cmsAgent.getItemsByCategory(category);
    } else {
      menuData = cmsAgent.getFullMenu();
    }

    res.json(menuData);

  } catch (error) {
    console.error('Menu endpoint error:', error);
    res.status(500).json({
      success: false,
      error: "Unable to retrieve menu data",
      code: "MENU_RETRIEVAL_ERROR",
      timestamp: new Date().toISOString()
    });
  }
});

// GET /api/recommendations/:itemName endpoint
app.get('/api/recommendations/:itemName', async (req, res) => {
  try {
    const { itemName } = req.params;

    if (!cmsAgent) {
      return res.status(503).json({
        success: false,
        error: "Menu service temporarily unavailable",
        code: "CMS_SERVICE_UNAVAILABLE",
        timestamp: new Date().toISOString()
      });
    }

    const itemData = cmsAgent.getItemByName(itemName);

    if (!itemData.success) {
      return res.status(404).json({
        success: false,
        error: itemData.error,
        code: "ITEM_NOT_FOUND",
        suggestions: itemData.suggestions,
        timestamp: new Date().toISOString()
      });
    }

    const pairings = cmsAgent.getPairingSuggestions(itemData.item, 3);

    res.json({
      success: true,
      item: itemData.item,
      recommendations: pairings.recommendations || [],
      count: pairings.count || 0,
      timestamp: pairings.timestamp || new Date().toISOString()
    });

  } catch (error) {
    console.error('Recommendations endpoint error:', error);
    res.status(500).json({
      success: false,
      error: "Unable to get recommendations",
      code: "RECOMMENDATIONS_ERROR",
      timestamp: new Date().toISOString()
    });
  }
});

// GET /api/stats endpoint for menu analytics
app.get('/api/stats', async (req, res) => {
  try {
    if (!cmsAgent) {
      return res.status(503).json({
        success: false,
        error: "Menu service temporarily unavailable",
        code: "CMS_SERVICE_UNAVAILABLE",
        timestamp: new Date().toISOString()
      });
    }

    const stats = cmsAgent.getMenuStats();
    res.json(stats);

  } catch (error) {
    console.error('Stats endpoint error:', error);
    res.status(500).json({
      success: false,
      error: "Unable to retrieve menu statistics",
      code: "STATS_ERROR",
      timestamp: new Date().toISOString()
    });
  }
});

// GET /api/discounted endpoint for only discounted items
app.get('/api/discounted', async (req, res) => {
  try {
    if (!cmsAgent) {
      return res.status(503).json({
        success: false,
        error: "Menu service temporarily unavailable",
        code: "CMS_SERVICE_UNAVAILABLE",
        timestamp: new Date().toISOString()
      });
    }

    const discounted = cmsAgent.getDiscountedItems();
    res.json(discounted);

  } catch (error) {
    console.error('Discounted endpoint error:', error);
    res.status(500).json({
      success: false,
      error: "Unable to retrieve discounted items",
      code: "DISCOUNTED_ERROR",
      timestamp: new Date().toISOString()
    });
  }
});

// POST /api/refresh endpoint to refresh menu data
app.post('/api/refresh', async (req, res) => {
  try {
    if (!cmsAgent) {
      return res.status(503).json({
        success: false,
        error: "Menu service temporarily unavailable",
        code: "CMS_SERVICE_UNAVAILABLE",
        timestamp: new Date().toISOString()
      });
    }

    const refresh = cmsAgent.refreshData();
    res.json(refresh);

  } catch (error) {
    console.error('Refresh endpoint error:', error);
    res.status(500).json({
      success: false,
      error: "Unable to refresh menu data",
      code: "REFRESH_ERROR",
      timestamp: new Date().toISOString()
    });
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