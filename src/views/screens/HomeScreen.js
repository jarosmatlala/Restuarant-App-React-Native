import React from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, Dimensions, Image, FlatList, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';

const hotels = [
  {
    id: '1',
    name: 'Italian Restuarant',
    location: '1st street, Central',
    price: 120,
    image: require('../../assets/italian.jpg'),
    details: 'Astonishing Restaurant with delicious North West Wild Life Meat',
  },
  {
    id: '2',
    name: 'Kitchen Cafe & Resto',
    location: 'Nyanki Street',
    price: 70,
    image: require('../../assets/cafe logo.jpg'),
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

  const Card = ({ hotel, index }) => {
    return (
      <View style={{...style.card}}>
      <View style={{...style.cardOverLay,opacity: 0}}/>

        <View style={style.priceTag}>
          <Text style={{ color: COLORS.white, fontSize: 20, fontWeight: 'bold' }}>
            R {hotel.price}
          </Text>
        </View>
        <Image source={hotel.image} style={style.cardImage} />

        <View style={style.cardDetails}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <View>
              <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                {hotel.name}
              </Text>
              <Text style={{ fontSize: 12, color: COLORS.grey }}>{hotel.location}</Text>

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
            </View>
            <Text style={{ fontSize: 10, color: COLORS.grey }}>365 reviews</Text>
          </View>
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
  cardOverLay:{
    height:280,
    backgroundColor: COLORS.white,
    position:'absolute',
    zIndex:100,
    width: cardWidth,
    borderRadius:15,
  }


});

export default HomeScreen;

