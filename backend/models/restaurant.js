const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  restaurantId: Number,
  name: String,
  countryCode: Number,
  city: String,
  locality: String,
  address: String,
  cuisines: String,
  currency: String,
  hasTableBooking: Boolean,
  hasOnlineDelivery: Boolean,
  priceRange: Number,
  aggregateRating: Number,
  ratingColor: String,
  ratingText: String,
  votes: Number
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
