import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import COLORS from '../../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CartScreen from "./CartScreen";  


const DetailsScreen = ({ navigation, route }) => {
  const { restaurant } = route.params || {};
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!restaurant) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } else {
      setLoading(false);
    }
  }, [restaurant]);

  if (loading) {
    return <ActivityIndicator size="large" color={COLORS.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
  }

  if (!restaurant) {
    return (
      <View style={styles.centered}>
        <Text>No restaurant data available.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: COLORS.white,
        paddingBottom: 20,
      }}
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground style={styles.headerImage} source={{ uri: restaurant.image || 'placeholder_image_url' }}>
        <View style={styles.header}>
          <Icon
            name="arrow-back-ios"
            size={28}
            color={COLORS.white}
            onPress={navigation.goBack}
          />
          <Icon
            name="bookmark-border"
            size={28}
            color={COLORS.white}
            onPress={() => {}}
          />
        </View>
      </ImageBackground>
      <View>
        <View style={styles.iconContainer}>
          <Icon name="place" color={COLORS.white} size={28} />
        </View>
        <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{restaurant.name || 'Restaurant Name'}</Text>
          <Text style={{ fontSize: 20, fontWeight: '400', color: COLORS.grey, marginTop: 5 }}>
            {restaurant.location || 'Restaurant Location'}
          </Text>
          <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row' }}>
                <Icon name="star" size={20} color={COLORS.orange} />
                <Icon name="star" size={20} color={COLORS.grey} />
              </View>
              <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 5 }}>
                5.0
              </Text>
              <View>
                <Text style={{ fontSize: 18, color: COLORS.grey }}>365 reviews</Text>
              </View>
            </View>

            <View>
              <Text style={{ fontSize: 18, color: COLORS.grey }}>{restaurant.cuisine || 'Cuisine'}</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 20,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Reservation Fee</Text>
          <View style={styles.priceTag}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: COLORS.orange,
                marginLeft: 5,
              }}
            >
              R{restaurant.price || '00.00'}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: COLORS.grey,
                marginLeft: 5,
              }}
            >
              + Welcome Drink
            </Text>
          </View>
        </View>

        <CartScreen />


        <View style={styles.btn}>
          <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: 'bold' }}>
            Book Now
          </Text>
        </View>
      </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  btn: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  priceTag: {
    height: 40,
    alignItems: 'center',
    marginLeft: 40,
    paddingLeft: 20,
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: 'row',
  },
  iconContainer: {
    position: 'absolute',
    height: 60,
    width: 60,
    backgroundColor: COLORS.primary,
    top: -30,
    right: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    height: 400,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    overflow: 'hidden',
  },
  header: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
});

export default DetailsScreen;
