import React from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, Dimensions, Image, FlatList, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';

const hotels = [
  {
    id: '1',
    name: 'Bakubung',
    location: 'Green street, Central District',
    price: 120,
    image: require('../../assets/heart.png'),
    details: 'Astonishing Restaurant with delicious North West Wild Life Meat',
  },
  {
    id: '2',
    name: 'Bring Khudu Restaurant',
    location: 'Yuki Nyanki Street',
    price: 70,
    image: require('../../assets/flower.png'), 
  },
];

const { width } = Dimensions.get('screen');
const cardWidth = width / 1.8;

const HomeScreen = ({ navigation }) => {
  const categories = ['All', 'Popular', 'Top Rated', 'Featured', 'Luxury'];
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);

  const CategoryList = () => {
    return (
      <View style={style.categoryListContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity key={index} activeOpacity={0.8} onPress={() => setSelectedCategoryIndex(index)}>
            <View>
              <Text style={{...style.categoryListText, color: selectedCategoryIndex === index ? COLORS.primary : COLORS.grey}}>
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

  const Card = ({ hotel, index }) => {
    return (
      <View style={style.card}>
        <Text style={{ padding: 10, fontWeight: 'bold' }}>{hotel.name}</Text>
        <Image source={hotel.image} style={{ height: 100, width: 100, marginTop: 10 }} />
        <Text style={{ padding: 10 }}>{hotel.location}</Text>
        <Text style={{ padding: 10, fontWeight: 'bold' }}>R{hotel.price}</Text>
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
          {hotels.length === 0 ? (
            <Text>No hotels available</Text>
          ) : (
            <FlatList
              horizontal
              data={hotels}
              contentContainerStyle={{ paddingVertical: 30, paddingLeft: 20 }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => <Card hotel={item} index={index} />}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>
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
});

export default HomeScreen;
