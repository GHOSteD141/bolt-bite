const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant.cjs');

// GET all restaurants
router.get('/', async (req, res) => {
    try {
        const restaurants = await Restaurant.find().lean();
        // Add default images if not present
        const enrichedRestaurants = restaurants.map(r => ({
            ...r,
            imageUrl: r.imageUrl || `https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&q=80`
        }));
        res.json(enrichedRestaurants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET restaurant by ID
router.get('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findOne({ restaurantId: req.params.id });
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.json(restaurant);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Search restaurants
router.get('/search/:query', async (req, res) => {
    try {
        const searchQuery = req.params.query;
        const restaurants = await Restaurant.find({
            $or: [
                { name: { $regex: searchQuery, $options: 'i' } },
                { cuisines: { $regex: searchQuery, $options: 'i' } },
                { locality: { $regex: searchQuery, $options: 'i' } }
            ]
        });
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Filter restaurants by cuisine
router.get('/cuisine/:cuisine', async (req, res) => {
    try {
        const restaurants = await Restaurant.find({
            cuisines: { $regex: req.params.cuisine, $options: 'i' }
        });
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
