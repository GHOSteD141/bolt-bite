const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: String,
  cuisine: String,
  address: String,
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
