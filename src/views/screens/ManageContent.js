import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ManageContent = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Content</Text>
      <Text style={styles.description}>
        Welcome to the content management section. Here you can manage your content.
      </Text>

      <Button 
        title="Go to Another Screen" 
        onPress={() => navigation.navigate('DetailsScreen')} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default ManageContent;
