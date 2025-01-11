import React from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import COLORS from '../../consts/colors';

const AdminDashboard = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Admin Dashboard</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ManageUsers')}>
        <Text style={styles.buttonText}>Manage Users</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ManageContent')}>
        <Text style={styles.buttonText}>Manage Content</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ManageReservation')}>
        <Text style={styles.buttonText}>Manage Content</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AdminDashboard;
