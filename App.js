import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import { Provider } from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/views/screens/HomeScreen';
import COLORS from './src/consts/colors';
import DetailsScreen from './src/views/screens/DetailsScreen';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Navigator } from 'react-native';
import LoginScreen from './src/views/screens/LoginScreen';
import RegisterScreen from './src/views/screens/RegisterScreen';
import AdminLoginScreen from './src/views/screens/AdminLoginScreen';
import AdminDashboard from './src/views/screens/AdminDashboard';
import ManageUsers from './src/views/screens/ManageUsers';
import AdminScreen from './src/views/screens/AdminScreen';
import ManageContent from './src/views/screens/ManageContent'; 
import CartScreen from './src/views/screens/CartScreen';
import CartReducer from './src/redux/CartReducer';
import store from './src/redux/store';  
import UserProfileScreen from './src/views/screens/UserProfile';

const Stack = createStackNavigator();

const App = () => {



return (
  <Provider store={store}>
<NavigationContainer>
  <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
  <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="RegisterScreen" component ={RegisterScreen} />
        <Stack.Screen name="LoginScreen" component ={LoginScreen} />
        <Stack.Screen name="HomeScreen" component ={HomeScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen name="AdminLoginScreen" component={AdminLoginScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="ManageUsers" component={ManageUsers} />
        <Stack.Screen name="ManageReservation" component={AdminScreen} />
        <Stack.Screen name="ManageContent" component={ManageContent} /> 
        <Stack.Screen name="CartScreen" component={CartScreen} /> 
        <Stack.Screen name="CartReducer" component={CartReducer} /> 
        <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} /> 
    </Stack.Navigator>  
  
</NavigationContainer>
</Provider>
  );
};

export default App;
