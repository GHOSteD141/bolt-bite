const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const Restaurant = require('../models/restaurant.cjs');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/boltbite', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

const loadData = async () => {
  try {
    await connectDB();
    await Restaurant.deleteMany({}); // Clear existing data
    console.log('Cleared existing restaurant data');

    const restaurants = [];
    fs.createReadStream(__dirname + '/../data/restaurants.csv')
      .pipe(csv())
      .on('data', (data) => {
        restaurants.push({
          restaurantId: parseInt(data.RestaurantID),
          name: data.RestaurantName,
          cuisines: data.Cuisines,
          averageCostForTwo: parseInt(data.AverageCostForTwo),
          currency: data.Currency,
          hasTableBooking: data.HasTableBooking === 'Yes',
          hasOnlineDelivery: data.HasOnlineDelivery === 'Yes',
          aggregateRating: parseFloat(data.AggregateRating),
          ratingText: data.RatingText,
          votes: parseInt(data.Votes)
        });
      })
      .on('end', async () => {
        try {
          await Restaurant.insertMany(restaurants);
          console.log(`Successfully loaded ${restaurants.length} restaurants`);
          mongoose.connection.close();
        } catch (err) {
          console.error('Error inserting restaurants:', err);
        }
      });
  } catch (err) {
    console.error('Error:', err);
  }
};

loadData();
