import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, ActivityIndicator,TouchableOpacity,  Alert } from 'react-native';
import { getUserProfile } from '../../services/userApi';
import COLORS from '../../consts/colors';

const UserProfile = ({ route }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const { token } = route.params;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileData = await getUserProfile(token);
        console.log('Profile Data:', profileData);
                setUserProfile(profileData);
      } catch (err) {
        console.log('Fetching user profile with token:', token);
        console.error('Error fetching user profile:', err);
        setError('Failed to load profile. Please try again later.');

      } finally {
        setIsLoading(false);
      }
    };

  
  if (token) {
    fetchUserProfile();
  } else {
    setError('No token found.');
    setIsLoading(false);
  }
}, [token]);


const handleLogout = async () => {
  Alert.alert(
    'Logout',
    'Are you sure you want to log out?',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Yes',
        onPress: async () => {
          await AsyncStorage.removeItem('userToken'); 
          navigation.replace('LoginScreen'); 
        },
      },
    ],
    { cancelable: true }
  );
};

  if (isLoading) {
    return <ActivityIndicator size="large" color={COLORS.primary} />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.profileContainer}>
        <Text style={styles.profileTitle}>User Profile</Text>
        {userProfile && (
          <View style={styles.profileDetails}>
            <Text>Email: {userProfile.email}</Text>
            <Text>Role: {userProfile.role}</Text>
            <Text>Joined: {new Date(userProfile.createdAt).toLocaleDateString()}</Text>
          </View>
        )}
        {error && <Text style={styles.errorText}>{error}</Text>}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    padding: 20,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 20,
  },
  profileDetails: {
    backgroundColor: COLORS.light,
    padding: 15,
    borderRadius: 10,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: COLORS.red,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default UserProfile;
