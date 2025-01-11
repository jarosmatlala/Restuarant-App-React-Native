import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, FlatList, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import { getReservations, createReservation, updateReservation, deleteReservation } from '../../services/reservationsApi';

const AdminScreen = ({ navigation }) => {
  const [reservations, setReservations] = useState([]);
  const [newReservation, setNewReservation] = useState({ name: '', date: '', time: '', partySize: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const fetchReservations = async () => {
      setIsLoading(true);
      try {
        const data = await getReservations();
        setReservations(data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReservations();
  }, []);

  const handleCreateReservation = async () => {
    setIsCreating(true);
    try {
      const data = await createReservation(newReservation);
      setReservations([...reservations, data]);
      setNewReservation({ name: '', date: '', time: '', partySize: '' });
    } catch (error) {
      console.error('Error creating reservation:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateReservation = async (reservationId) => {
    const updatedData = { name: 'Updated Reservation', date: '2025-01-15', time: '19:00', partySize: '4' };
    try {
      const updatedReservation = await updateReservation(reservationId, updatedData);
      setReservations(reservations.map(reservation => reservation._id === reservationId ? updatedReservation : reservation));
    } catch (error) {
      console.error('Error updating reservation:', error);
    }
  };

  const handleDeleteReservation = async (reservationId) => {
    try {
      await deleteReservation(reservationId);
      setReservations(reservations.filter(reservation => reservation._id !== reservationId));
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color={COLORS.primary} />;
  }

  const ReservationCard = ({ reservation }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{reservation.name}</Text>
        <Text>Date: {reservation.date}</Text>
        <Text>Time: {reservation.time}</Text>
        <Text>Party Size: {reservation.partySize}</Text>
        <View style={styles.cardActions}>
          <TouchableOpacity onPress={() => handleUpdateReservation(reservation._id)}>
            <Icon name="edit" size={20} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteReservation(reservation._id)}>
            <Icon name="delete" size={20} color={COLORS.red} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Panel</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.createReservationForm}>
          <TextInput
            placeholder="Name"
            value={newReservation.name}
            onChangeText={(text) => setNewReservation({ ...newReservation, name: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Date (YYYY-MM-DD)"
            value={newReservation.date}
            onChangeText={(text) => setNewReservation({ ...newReservation, date: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Time (HH:MM)"
            value={newReservation.time}
            onChangeText={(text) => setNewReservation({ ...newReservation, time: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Party Size"
            value={newReservation.partySize}
            onChangeText={(text) => setNewReservation({ ...newReservation, partySize: text })}
            style={styles.input}
          />
          <TouchableOpacity onPress={handleCreateReservation} disabled={isCreating} style={styles.createButton}>
            <Text style={styles.createButtonText}>{isCreating ? 'Creating...' : 'Create Reservation'}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.reservationsTitle}>Existing Reservations</Text>
        <FlatList
          data={reservations}
          renderItem={({ item }) => <ReservationCard reservation={item} />}
          keyExtractor={(item) => item._id}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  scrollContainer: {
    padding: 20,
  },
  createReservationForm: {
    marginBottom: 30,
  },
  input: {
    height: 45,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  createButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  createButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  reservationsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.primary,
  },
  card: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AdminScreen;
