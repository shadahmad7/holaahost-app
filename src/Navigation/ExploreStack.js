import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ExploreScreen from '../Screens/Explore/ExploreScreen';

import React from 'react';
import SearchScreen from '../Screens/Explore/SearchScreen';
import SeachLocationScreen from '../Screens/Explore/SeachLocationScreen';
const Stack = createNativeStackNavigator();

export default function ExploreStack() {
  return (
  
      <Stack.Navigator  screenOptions={{headerShown: false}}>
        <Stack.Screen name="SearchScreen" component={SearchScreen} headerShown={true} />
        <Stack.Screen name="SeachLocationScreen" component={SeachLocationScreen} headerShown={true} />
      </Stack.Navigator>
    
  );
}
