import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../Screens/Auth/Login';
import Register from '../Screens/Auth/Register';
import React from 'react';
import BottomTabBar from './BottomTabBar';
const Stack = createNativeStackNavigator();
import Forget from '../Screens/Auth/Forget';
import SplashScreen from '../Screens/SplashScreen';



function MainApp() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="BottomTabBar" component={BottomTabBar} headerShown={false} />
    </Stack.Navigator>
  );
}


export default function AuthStack() {
  
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen name="Login" component={Login} headerShown={true} />
      <Stack.Screen name="Register" component={Register} headerShown={true} />
      <Stack.Screen name="Forget Password" component={Forget} headerShown={true} />
      <Stack.Screen name="MainApp" component={MainApp} headerShown={false} />
    </Stack.Navigator>
  );
}
