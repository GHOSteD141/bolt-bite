const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const Restaurant = require('./models/restaurant.cjs');
const { menuItems } = require('./data/menu');

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://127.0.0.1:27017/boltbite', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4
})
.then(() => {
  console.log('Connected to MongoDB...');
  seedDatabase();
})
.catch(err => console.error('MongoDB connection error:', err));

async function seedDatabase() {
  try {
    // Clear existing data
    await Restaurant.deleteMany({});
    console.log('🗑️  Cleared existing restaurants');

    const restaurants = [];
    
    // Read CSV and create restaurants
    fs.createReadStream(__dirname + '/data/restaurants.csv')
      .pipe(csv())
      .on('data', (row) => {
        console.log(`📍 Processing: ${row.RestaurantName}`);
        console.log(`   Image URL from CSV: ${row.ImageURL}`);
        
        const menuCategory = row.Cuisines.split(',')[0].trim();
        let restaurantMenu = menuItems[menuCategory] || menuItems["Pizzas & Burgers"];
        
        // Pizza Paradise gets only Pizzas & Burgers
        if (row.RestaurantID == 1) {
          restaurantMenu = menuItems["Pizzas & Burgers"];
        }
        
        const restaurant = {
          restaurantId: parseInt(row.RestaurantID),
          name: row.RestaurantName,
          cuisines: row.Cuisines,
          imageUrl: row.ImageURL || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop',
          averageCostForTwo: parseInt(row.AverageCostForTwo),
          currency: row.Currency,
          hasTableBooking: row.HasTableBooking === 'Yes',
          hasOnlineDelivery: row.HasOnlineDelivery === 'Yes',
          aggregateRating: parseFloat(row.AggregateRating),
          ratingText: row.RatingText,
          votes: parseInt(row.Votes),
          menu: restaurantMenu
        };
        
        console.log(`✅ Added: ${restaurant.name} with image: ${restaurant.imageUrl}`);
        restaurants.push(restaurant);
      })
      .on('end', async () => {
        try {
          if (restaurants.length === 0) {
            console.error('❌ No restaurants found in CSV!');
            mongoose.connection.close();
            return;
          }
          
          // Delete old data first
          await Restaurant.deleteMany({});
          console.log('🗑️  Cleared old data');
          
          const result = await Restaurant.insertMany(restaurants);
          console.log(`\n✅ Successfully seeded ${result.length} restaurants with images!`);
          
          // Wait a moment for DB to sync
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Now verify - check the newly inserted data
          const count = await Restaurant.countDocuments();
          console.log(`📊 Total restaurants in DB: ${count}`);
          
          // Get fresh data from DB
          const allRestaurants = await Restaurant.find({});
          console.log('\n📋 Restaurants with images:');
          allRestaurants.forEach(r => {
            console.log(`  🍽️  ${r.name}: ${r.imageUrl}`);
          });
          
          console.log('\n✅ Seeding complete!');
          mongoose.connection.close();
        } catch (err) {
          console.error('❌ Error inserting restaurants:', err);
          mongoose.connection.close();
        }
      })
      .on('error', (err) => {
        console.error('❌ CSV parse error:', err);
        mongoose.connection.close();
      });
  } catch (err) {
    console.error('❌ Seed error:', err);
    mongoose.connection.close();
  }
}
