export const getUserProfile = async (token) => {
    const response = await fetch('https://restuarant-app-react-native-backend.onrender.com/api/auth/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }
  
    return await response.json();
  };
  