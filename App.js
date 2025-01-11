import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/views/screens/HomeScreen';
import COLORS from './src/consts/colors';
import DetailsScreen from './src/views/screens/DetailsScreen';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Navigator } from 'react-native';
import LoginScreen from './src/views/screens/LoginScreen';
import RegisterScreen from './src/views/screens/RegisterScreen';

const Stack = createStackNavigator();

const App = () => {

return (
<NavigationContainer>
  <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
  <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name="RegisterScreen" component ={RegisterScreen} />
    <Stack.Screen name="LoginScreen" component ={LoginScreen} />
    <Stack.Screen name="Home" component ={HomeScreen} />
    <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
    </Stack.Navigator>  
  
</NavigationContainer>
  );
};

export default App;
