import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabBar from './BottomTabBar';
import Splash from '../Screens/Splash'
import AuthStack from './AuthStack';
import SplashScreen from '../Screens/SplashScreen';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator  screenOptions={{headerShown: false}}> 

        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="BottomTabBar" component={BottomTabBar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
