import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, Dimensions, Image, FlatList, TextInput, ScrollView, Animated ,ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import { getRestaurants } from '../../services/api';

const { width } = Dimensions.get('screen');
const cardWidth = width / 1.8;

const HomeScreen = ({ navigation }) => {
  const categories = ['All', 'Popular', 'Top Rated', 'Featured', 'Luxury'];
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
  const [activeCardIndex, setActiveCardIndex] = React.useState(0);
  const [restaurants, setRestaurants] = useState([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchRestaurants = async () => {
      setIsLoading(true);
      try {
        const data = await getRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRestaurants();
  }, []);
  
  if (isLoading) {
    return <ActivityIndicator size="large" color={COLORS.primary} />;
  }

  const CategoryList = ({ navigation }) => {
    return (
      <View style={style.categoryListContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity key={index} activeOpacity={0.8} onPress={() => setSelectedCategoryIndex(index)}>
            <View>
              <Text style={{ ...style.categoryListText, color: selectedCategoryIndex === index ? COLORS.primary : COLORS.grey }}>
                {item}
              </Text>
              {selectedCategoryIndex === index && (
                <View style={{ height: 3, width: 30, backgroundColor: COLORS.primary, marginTop: 2 }} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const Card = ({ restaurant, index }) => {
    const inputRange = [
      (index - 1) * cardWidth,
      index * cardWidth,
      (index + 1) * cardWidth,
    ];
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 0, 0.7],
    });
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
    });

    return (
      <TouchableOpacity
        disabled={activeCardIndex != index}
        activeOpacity={1}
        onPress={() => navigation.navigate('DetailsScreen', { restaurant: restaurant })}>
        <Animated.View style={{ ...style.card, transform: [{ scale }] }}>
          <Animated.View style={{ ...style.cardOverLay, opacity }} />
          <View style={style.priceTag}>
            <Text style={{ color: COLORS.white, fontSize: 20, fontWeight: 'bold' }}>
              R {restaurant.price || '00.00'}
            </Text>
          </View>
          <Image source={restaurant.image || require('../../assets/placeholder.jpg')} style={style.cardImage} />
          <View style={style.cardDetails}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                  {restaurant.name || 'Restaurant Name'}
                </Text>
                <Text style={{ fontSize: 12, color: COLORS.grey }}>
                  {restaurant.location || 'Restaurant Location'}
                </Text>
              </View>
              <Icon name="bookmark-border" size={26} color={COLORS.primary} />
            </View>
            <View style={{
              flexDirection: "row",
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
              <View style={{ flexDirection: 'row' }}>
                <Icon name="star" size={15} color={COLORS.orange} />
                <Icon name="star" size={15} color={COLORS.orange} />
              </View>
              <Text style={{ fontSize: 10, color: COLORS.grey }}>365 reviews</Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const TopRestaurantCard = ({ restaurant }) => {
    return (
      <View style={style.topHotelCard}>
        <View style={{ position: 'absolute', top: 5, right: 5, zIndex: 1, flexDirection: 'row' }}>
          <Icon name="star" size={15} color={COLORS.orange} />
          <Text style={{ color: COLORS.primary, fontWeight: 'bold', fontSize: 15 }}>
            5.0
          </Text>
        </View>
        <Image style={style.topHotelCardImage} source={restaurant.image || require('../../assets/placeholder.jpg')} />
        <View style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{restaurant.name || 'Restaurant Name'} </Text>
          <Text style={{ fontSize: 7, fontWeight: 'bold', color: COLORS.grey }}>
            {restaurant.location || 'Restaurant Location'}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={style.header}>
        <View style={{ paddingBottom: 15 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Find Your Restaurant</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>In</Text>
            <Text style={{ fontSize: 30, fontWeight: 'bold', color: COLORS.primary }}>Nokaneng</Text>
          </View>
        </View>
        <Icon name="person-outline" size={38} color={COLORS.grey} />
      </View>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={style.searchInputContainer}>
          <Icon name="search" size={30} style={{ marginLeft: 20 }} />
          <TextInput placeholder="Search" style={{ fontSize: 20, paddingLeft: 8 }} />
        </View>
        <CategoryList />
        <View>
          {restaurants.length === 0 ? (
            <Text>No restaurants available</Text>
          ) : (
            <Animated.FlatList
              onMomentumScrollEnd={(e) => {
                setActiveCardIndex(
                  Math.round(e.nativeEvent.contentOffset.x / cardWidth),
                );
              }}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true },
              )}
              horizontal
              data={restaurants}
              contentContainerStyle={{ paddingVertical: 30, paddingLeft: 20, paddingRight: cardWidth / 2 - 40 }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => <Card restaurant={item} index={index} />}
              keyExtractor={(item) => item._id}
              snapToInterval={cardWidth}
            />
          )}
        </View>
        <View style={{
          flexDirection: "row",
          justifyContent: 'space-between',
          marginHorizontal: 20,
        }}>
          <Text style={{ color: COLORS.grey, fontWeight: 'bold' }}>
            Top Restaurants
          </Text>
          <Text style={{ color: COLORS.grey }}> Show all</Text>
        </View>
        <FlatList
          data={restaurants}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 20,
            marginTop: 20,
            paddingBottom: 30,
          }}
          renderItem={({ item }) => <TopRestaurantCard restaurant={item} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    marginTop: 15,
    marginLeft: 20,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 30,
  },
  categoryListText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  card: {
    height: 280,
    width: cardWidth,
    elevation: 15,
    marginRight: 20,
    borderRadius: 15,
    backgroundColor: COLORS.light,
  },
  cardImage: {
    height: 200,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  priceTag: {
    height: 60,
    width: 80,
    backgroundColor: COLORS.primary,
    position: 'absolute',
    zIndex: 1,
    right: 0,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDetails: {
    height: 100,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 0,
    padding: 20,
    width: '100%'
  },
  cardOverLay: {
    height: 280,
    backgroundColor: COLORS.white,
    position: 'absolute',
    zIndex: 100,
    width: cardWidth,
    borderRadius: 15,
  },
  topHotelCard: {
    height: 120,
    width: 120,
    backgroundColor: COLORS.white,
    elevation: 15,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  topHotelCardImage: {
    height:88,
    width: '100%',
    borderTopRightRadius:10,
    borderTopLeftRadius:10,
  }
});

export default HomeScreen;
