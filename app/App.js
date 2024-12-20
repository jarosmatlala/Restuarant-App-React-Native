import { Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../src/screens/HomeScreen"; 
import COLORS from "../src/consts/colors"; 
import DetailsScreen from "../src/screens/DetailsScreen"; 
import { StatusBar } from 'react-native'; 

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />

        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        </Stack.Navigator>
      
    </>
  );
};

export default App;
