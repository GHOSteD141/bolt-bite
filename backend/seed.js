const mongoose = require('mongoose');
// Suppress strictQuery warning for Mongoose 7
mongoose.set('strictQuery', true);
const csv = require('csv-parser');
const fs = require('fs');
const Restaurant = require('./models/restaurant'); // Adjust path if necessary
const path = require('path');

// MongoDB connection string
const dbURI = 'mongodb://localhost:27017/boltbite';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB...');
    console.log('Starting to seed database...');
    seedDatabase();
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });

// Update the CSV file path to the correct location
const csvFilePath = 'C:/Users/SHREYAJIT BEURA/Downloads/dummy_restaurant_data_80.csv';

async function seedDatabase() {
  try {
    console.log('Reading CSV file from:', csvFilePath);
    // Clear existing data
    await Restaurant.deleteMany({});
    console.log('Existing data cleared...');

    const results = [];

    fs.createReadStream(csvFilePath) 
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        // Convert CSV data to the format expected by your Mongoose schema
        const restaurantData = results.map(row => ({
          restaurantId: parseInt(row['Restaurant ID']),
          name: row['Restaurant Name'],
          countryCode: parseInt(row['Country Code']),
          city: row['City'], 
          locality: row['Locality'],
          address: row['Address'],
          cuisines: row['Cuisines'],
          currency: row['Currency'],
          hasTableBooking: row['Has Table Booking'] === 'True',
          hasOnlineDelivery: row['Has Online Delivery'] === 'True',
          priceRange: parseInt(row['Price Range']),
          aggregateRating: parseFloat(row['Aggregate Rating']),
          ratingColor: row['Rating Color'],
          ratingText: row['Rating Text'],
          votes: parseInt(row['Votes'])
        }));

        await Restaurant.insertMany(restaurantData);
        console.log(`Successfully inserted ${restaurantData.length} restaurants!`);
        mongoose.connection.close();
      });
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
    process.exit(1);
  }
}
