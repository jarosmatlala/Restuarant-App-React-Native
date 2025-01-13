import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://restuarant-app-react-native-backend.onrender.com';
const API_URL_OFFERINGS = 'https://restuarant-app-react-native-backend.onrender.com/api/offerings';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    console.error('API Error:', error);
    throw new Error(error.message || 'Request failed');
  }
  return response.json();
};

export const getOfferings = async () => {
  try {
    const response = await fetch(API_URL_OFFERINGS);
    return await handleResponse(response);
  } catch (error) {
    console.error("Error fetching offerings:", error);
    throw new Error('Unable to load offerings data. Please try again later.');
  }
};

export const getOfferingById = async (offeringId) => {
  try {
    const response = await fetch(`${API_URL_OFFERINGS}/${offeringId}`);
    return await handleResponse(response);
  } catch (error) {
    console.error("Error fetching offering by ID:", error);
    throw new Error('Unable to fetch offering details. Please try again later.');
  }
};

export const createOffering = async (offeringData) => {
  try {
    const response = await fetch(API_URL_OFFERINGS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(offeringData),
    });

    const result = await handleResponse(response);
    console.log('Offering created successfully:', result);
    return result;
  } catch (error) {
    console.error("Error creating offering:", error);
    throw error;
  }
};

export const updateOffering = async (offeringId, offeringData) => {
  try {
    const response = await fetch(`${API_URL_OFFERINGS}/${offeringId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(offeringData),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error updating offering:", error);
    throw error;
  }
};

export const deleteOffering = async (offeringId) => {
  try {
    const response = await fetch(`${API_URL_OFFERINGS}/${offeringId}`, {
      method: 'DELETE',
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error deleting offering:", error);
    throw error;
  }
};

export const getOfferingToken = async () => {
  return await AsyncStorage.getItem('offeringToken');
};

export const setOfferingToken = async (token) => {
  try {
    await AsyncStorage.setItem('offeringToken', token);
  } catch (error) {
    console.error("Error setting offering token:", error);
  }
};

export const removeOfferingToken = async () => {
  try {
    await AsyncStorage.removeItem('offeringToken');
  } catch (error) {
    console.error("Error removing offering token:", error);
  }
};
