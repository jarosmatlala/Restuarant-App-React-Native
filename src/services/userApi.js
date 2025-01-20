export const getUserProfile = async (token) => {
  try {
    console.log('Fetching user profile with token:', token); 

    const response = await fetch('https://restuarant-app-react-native-backend.onrender.com/api/auth/profile', {  
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text(); 
      console.error('Error response status:', response.status); 
      console.error('Error response body:', errorText);
      throw new Error('Failed to fetch user profile');
    }

    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json(); 
      return data; 
    } else {
      const errorText = await response.text(); 
      console.error('Unexpected response format:', errorText);
      throw new Error('Unexpected response format');
    }
  } catch (error) {
    console.error('Error in getUserProfile:', error); 
    throw error; 
  }
};
