// services/userApi.js
export const getUserProfile = async (token) => {
  try {
    console.log('Fetching user profile with token:', token); // Log token before making request

    const response = await fetch('https://restuarant-app-react-native-backend.onrender.com/api/auth/profile', {  // Updated endpoint
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Check if the response is OK (status 200-299)
    if (!response.ok) {
      const errorText = await response.text(); // Read the response as text
      console.error('Error response status:', response.status); // Log status code
      console.error('Error response body:', errorText); // Log the error response
      throw new Error('Failed to fetch user profile');
    }

    // Check the response content type before trying to parse as JSON
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json(); // Parse the response as JSON
      return data; // Return the profile data
    } else {
      const errorText = await response.text(); // If it's not JSON, log the raw response
      console.error('Unexpected response format:', errorText);
      throw new Error('Unexpected response format');
    }
  } catch (error) {
    console.error('Error in getUserProfile:', error); // Log error details
    throw error; // Rethrow the error to be caught in the component
  }
};
