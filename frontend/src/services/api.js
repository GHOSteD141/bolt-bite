import axios from 'axios';

const API_URL = 'http://localhost:3005/api';

export const getRestaurants = async () => {
  const response = await axios.get(`${API_URL}/restaurants`);
  return response.data;
};

export const getRestaurantById = async (id) => {
  const response = await axios.get(`${API_URL}/restaurants/${id}`);
  return response.data;
};

export const searchRestaurants = async (query) => {
  const response = await axios.get(`${API_URL}/restaurants/search/${query}`);
  return response.data;
};
