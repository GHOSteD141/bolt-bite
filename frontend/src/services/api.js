const API_BASE_URL = 'http://localhost:3001'; // Replace with your backend URL

async function getRestaurants() {
  const response = await fetch(`${API_BASE_URL}/restaurants`);
  return response.json();
}

export { getRestaurants };
