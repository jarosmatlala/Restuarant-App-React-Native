import React from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import hotels from '../../consts/hotels';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

const HomeScreen = ({ navigation }) => {
    const categories = ['All', 'Popular', 'Top Rated', 'Featured', 'Luxury'];
    const [selectedCategoryIndex,setSelectedCategoryIndex] = React.useState(0);

    const CategoryList = () => {
        return (
            <View style={style.categoryListContainer}>
                {categories.map((item, index) => (
                    <TouchableOpacity key={index} activeOpacity={0.8} onPress={() => setSelectedCategoryIndex(index) }>
                        <View>
                            <Text 
                            style={{...style.categoryListText,
                                color:
                                selectedCategoryIndex == index
                                ? COLORS.primary 
                                : COLORS.grey,
                                 }}>
                                {item}
                            </Text>
                            {selectedCategoryIndex == index &&(
                            <View style={{
                                height: 3,
                                width: 30,
                                backgroundColor:COLORS.primary,
                                marginTop:2,
                            }}
                            />
                        )}

                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>

            <View style={style.header}>
                <View style={{ paddingBottom: 15 }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
                        Find Your Restuarant
                    </Text>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>In
                        </Text>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: COLORS.primary }}>
                            Nokaneng
                        </Text>
                    </View>
                </View>
                <Icon name="person-outline" size={38} color={COLORS.grey} />
            </View>
            <ScrollView showsHorizontalScrollIndicator={false}>
                <View style={style.searchInputContainer}>
                    <Icon name="search" size={30} style={{ marginLeft: 20 }} />
                    <TextInput
                        placeholder="Search"
                        style={{ fontSize: 20, paddingLeft: 8 }} />

                </View>
                <CategoryList />
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
    categoryListText:{
        fontSize:17,
        fontWeight:'bold',
    }
});

export default HomeScreen;