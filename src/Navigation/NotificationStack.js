import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NotificationScreen from '../Screens/Notification/NotificationScreen';
import {Image} from 'react-native'

import React from 'react';
import imagePath from '../constants/imagePath';

import Login from '../Screens/Auth/Login'
import Register from '../Screens/Auth/Register'




const Stack = createNativeStackNavigator();

export default function NotificationStack() {
  const [logged, setLogged] = React.useState(true);
  function LogoTitle() {
    return (
      <Image
      style={{width: 100, height: 60}}
        source={imagePath.logo}
        resizeMode='contain'
      />
    );
  }

  return (
  
      <Stack.Navigator  screenOptions={{headerShown: true}}>
        <Stack.Screen name="NotificationScreen" component={NotificationScreen} 
        headerShown={true} 
         options={{ headerTitle: logged ? "Notification" :  (props) => <LogoTitle {...props} /> }}
        />
        <Stack.Screen name="Register" component={Register} headerShown={true} />
        <Stack.Screen name="Login" component={Login} headerShown={true} />
      </Stack.Navigator>
    
  );
}
