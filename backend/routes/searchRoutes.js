const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Combined search endpoint - searches both restaurants and food items
router.get('/combined/:query', searchController.combinedSearch);

// Restaurant-only search
router.get('/restaurants/:query', searchController.searchRestaurants);

// Food item-only search
router.get('/food-items/:query', searchController.searchFoodItems);

module.exports = router;