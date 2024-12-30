import React from 'react';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import hotels from '../../consts/hotels';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

const HomeScreen = ({ navigation }) => {
    const categories = ['All', 'Popular', 'Top Rated', 'Featured', 'Luxury'];

return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>

            <View style={style.header}>
                <View style={{ paddingBottom: 15 }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
                        Find Your Restuarant
                    </Text>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{fontSize:30,fontWeight:'bold'}}>In
                        </Text>
                        <Text style={{ fontSize: 30,  fontWeight: 'bold', color: COLORS.primary }}>
                             Nokaneng
                        </Text>
                    </View>
                </View>
            <Icon name="person-outline" size={38} color={COLORS.grey}/>
            </View>
            <ScrollView showsHorizontalScrollIndicator={false}>
                <View style={style.searchInputContainer}>
                    <Icon name="search" size={30} style={{marginLeft:20}} />
                    <TextInput
                    placeholder="Search"
                    style={{fontSize:20, paddingLeft:10}}/>
                    
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
    searchInputContainer:{
        height: 50,
        backgroundColor: COLORS.light,
        marginTop: 15,
        marginLeft: 20,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default HomeScreen;