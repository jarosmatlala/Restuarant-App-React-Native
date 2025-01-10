import React from 'react';
import { ScrollView,Text,View,StyleSheet ,Image} from 'react-native';
import COLORS from '../../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const DetailsScreen = ({navigation,route}) => {
    const item = route.params;
    console.log(item);
    return(
        <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
            backgroundColor:COLORS.white,
            paddingBottom:20,
            }}>
        <StatusBar 
        barStyle="light-content"
        translucent
        backgroundColor="rgba(0,0,0,0)"          
        />
        <ImageBackground
         style={style.headerImage} source={item.image}>
        <View style={style.header}>
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
            onPress={navigation.goBack}
            />
        </View>
         </ImageBackground>
         <View>
            <View style={style.iconContainer}></View>
         </View>
        </ScrollView>
    );
};

const style = StyleSheet.create({
    iconContainer:{
        position:'absolute',
        height:60,
        width:60,
        backgroundColor:COLORS.primary,
        top:-30,
        right:20,
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center',
    },
    headerImage:{
        height:400,
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
        overflow: 'hedden', 
    },
    header:{
        marginTop:60,   
        flexDirection:'row',
        alignItems:'center',
        marginHorizontal:20,
        justifyContent:"space-between",

    },
})

export default DetailsScreen;