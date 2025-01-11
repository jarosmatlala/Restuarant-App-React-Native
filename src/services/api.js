import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://restuarant-app-react-native-backend.onrender.com';
const API_URL_RESTAURANTS = 'https://restuarant-app-react-native-backend.onrender.com/api/';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Request failed');
  }
  return response.json();
};

export const getRestaurants = async () => {
  try {
    const response = await fetch(API_URL_RESTAURANTS);
    return await handleResponse(response);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw new Error('Unable to load restaurant data. Please try again later.');
  }
};

export const getRestaurantsByFilter = async (filter = {}) => {
  try {
    const queryParams = new URLSearchParams(filter).toString();
    const response = await fetch(`${API_URL_RESTAURANTS}?${queryParams}`);
    return await handleResponse(response);
  } catch (error) {
    console.error("Error fetching filtered restaurants:", error);
    throw error;
  }
};

export const createRestaurant = async (restaurantData) => {
  try {
    const response = await fetch(API_URL_RESTAURANTS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(restaurantData),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error creating restaurant:", error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const updateRestaurant = async (restaurantId, restaurantData) => {
  try {
    const response = await fetch(`${API_URL_RESTAURANTS}/${restaurantId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(restaurantData),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error updating restaurant:", error);
    throw error;
  }
};

export const deleteRestaurant = async (restaurantId) => {
  try {
    const response = await fetch(`${API_URL_RESTAURANTS}/${restaurantId}`, {
      method: 'DELETE',
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await handleResponse(response);
    const { token } = data;
    if (token) {
      await AsyncStorage.setItem('userToken', token);
    }
    return data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
  } catch (error) {
    console.error("Error logging out user:", error);
  }
};

export const getToken = async () => {
  return await AsyncStorage.getItem('userToken');
};
