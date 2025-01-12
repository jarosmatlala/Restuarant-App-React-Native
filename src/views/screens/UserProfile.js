import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
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
        console.log('Profile Data:', profileData); // Log profile data
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
});

export default UserProfile;
