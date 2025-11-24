const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

// Get trending restaurants
router.get('/trending', recommendationController.getTrending);

// Get personalized recommendations based on preferences
router.get('/personalized', recommendationController.getPersonalized);

// Update user preferences
router.post('/preferences', recommendationController.updatePreferences);

module.exports = router;