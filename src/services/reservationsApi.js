import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://restuarant-app-react-native-backend.onrender.com';
const API_URL_RESERVATIONS = 'https://restuarant-app-react-native-backend.onrender.com/api/reservations';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    console.error('API Error:', error);
    throw new Error(error.message || 'Request failed');
  }
  return response.json();
};

export const getReservations = async () => {
  try {
    const response = await fetch(API_URL_RESERVATIONS);
    return await handleResponse(response);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    throw new Error('Unable to load reservation data. Please try again later.');
  }
};

export const getReservationsByFilter = async (filter = {}) => {
  try {
    const queryParams = new URLSearchParams(filter).toString();
    const response = await fetch(`${API_URL_RESERVATIONS}?${queryParams}`);
    return await handleResponse(response);
  } catch (error) {
    console.error("Error fetching filtered reservations:", error);
    throw error;
  }
};

export const createReservation = async (reservationData) => {
  try {
    console.log('Creating reservation with data:', reservationData); 

    const response = await fetch(API_URL_RESERVATIONS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservationData),
    });

    const result = await handleResponse(response);
    console.log('Reservation created successfully:', result); 
    return result;

  } catch (error) {
    console.error("Error creating reservation:", error);
    throw error;
  }
};

export const updateReservation = async (reservationId, reservationData) => {
  try {
    const response = await fetch(`${API_URL_RESERVATIONS}/${reservationId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservationData),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error updating reservation:", error);
    throw error;
  }
};

export const deleteReservation = async (reservationId) => {
  try {
    const response = await fetch(`${API_URL_RESERVATIONS}/${reservationId}`, {
      method: 'DELETE',
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error deleting reservation:", error);
    throw error;
  }
};

export const getReservationToken = async () => {
  return await AsyncStorage.getItem('reservationToken');
};

export const setReservationToken = async (token) => {
  try {
    await AsyncStorage.setItem('reservationToken', token);
  } catch (error) {
    console.error("Error setting reservation token:", error);
  }
};

export const removeReservationToken = async () => {
  try {
    await AsyncStorage.removeItem('reservationToken');
  } catch (error) {
    console.error("Error removing reservation token:", error);
  }
};
