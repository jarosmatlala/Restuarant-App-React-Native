import React from 'react';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import hotels from '../../consts/hotels';

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
                             Brits
                        </Text>
                    </View>
                </View>
            <Icon name="person-outline" size={38} color={COLORS.grey}/>
            </View>
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
});

export default HomeScreen;