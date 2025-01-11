import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { fetchUsers, deleteUser } from '../../services/api'; 
import COLORS from '../../consts/colors';

const ManageUsers = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const userData = await fetchUsers();
      setUsers(userData);
    };
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      Alert.alert('Success', 'User deleted');
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      Alert.alert('Error', 'Failed to delete user');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Manage Users</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.userItem}>
            <Text style={styles.userName}>{item.name}</Text>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: COLORS.grey,
  },
  userName: {
    fontSize: 18,
  },
  deleteButton: {
    color: COLORS.primary,
    fontSize: 16,
  },
});

export default ManageUsers;
