import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MessageScreen from '../Screens/Message/MessageScreen';
import {Button, Image, View, TouchableOpacity, Modal, Text} from 'react-native';

import React, {useState} from 'react';
import imagePath from '../constants/imagePath';
import ChatScreen from '../Screens/Message/ChatScreen';
import Login from '../Screens/Auth/Login';
import Register from '../Screens/Auth/Register';
import Icon from 'react-native-vector-icons/Feather';


const Stack = createNativeStackNavigator();


export default function MessageStack() {
  const [logged, setLogged] = React.useState(true);

  function LogoTitle() {
    return (
      <Image
        style={{width: 100, height: 60}}
        source={imagePath.logo}
        resizeMode="contain"
      />
    );
  }
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="MessageScreen"
        component={MessageScreen}
        headerShown={true}
        options={{
          headerTitle: logged ? 'Message' : props => <LogoTitle {...props} />,
        }}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        headerShown={true}
        options={({ route }) => ({ title: route.params.userName })}
        // options={{
        //   headerRight: () => (
        //     <>
        //       <TouchableOpacity >
        //         <Icon
        //           name="trash"
        //           size={24}
        //           color="#fff"
        //           style={{marginRight: 20}}
        //         />
        //       </TouchableOpacity>
        //       <TouchableOpacity>
        //         <Icon
        //           name="user-x"
        //           size={24}
        //           color="#fff"
        //           style={{marginRight: 20}}
        //         />
        //       </TouchableOpacity>
        //     </>
        //   ),
        //   headerStyle: {backgroundColor: '#000'},
        //   headerTintColor: '#fff',
        // }}
      />
      <Stack.Screen name="Login" component={Login} headerShown={true} />
      <Stack.Screen name="Register" component={Register} headerShown={true} />
    </Stack.Navigator>
  );
}
