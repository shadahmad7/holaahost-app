import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Screens/Home/HomeScreen';
import {Image,View,Text, TouchableOpacity} from 'react-native';
import React from 'react';
import imagePath from '../constants/imagePath';
import ProfileStack from './ProfileStack';
import navigationStrings from '../constants/navigationStrings';
import {useNavigation} from '@react-navigation/native';
import ExploreScreen from '../Screens/Explore/ExploreScreen';
import SearchScreen from '../Screens/Explore/SearchScreen';
import SeachLocationScreen from '../Screens/Explore/SeachLocationScreen';
import CreateGroup from '../Screens/Create/CreateGroup';
import CreateEvent from '../Screens/Create/CreateEvent';
import Events from '../Screens/Event/Events';
import Groups from '../Screens/Group/Groups';
import GroupDetail from '../Screens/Group/GroupDetail';
import EventDetail from '../Screens/Event/EventDetail';
import PaymentScreen from '../Screens/Payment/PaymentScreen';
import Login from '../Screens/Auth/Login';
import Register from '../Screens/Auth/Register';
import BlogDetail from '../Screens/Group/BlogDetail';
import MessageStack from './MessageStack';
const Stack = createNativeStackNavigator();


export default function HomeStack() {
  const navigation = useNavigation();



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
        name="HomeScreen"
        component={HomeScreen}
        headerShown={true}
        options={{
          headerTitle: props => <LogoTitle {...props} />,
        
        }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SeachLocationScreen"
        component={SeachLocationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Create Group"
        component={CreateGroup}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Create Event"
        component={CreateEvent}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Make Payment"
        component={PaymentScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Events"
        component={Events}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Groups"
        component={Groups}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="GroupDetail"
        component={GroupDetail}
        options={({ route }) => ({ title: route.params.groupTitle })}
      />
      <Stack.Screen
        name="EventDetail"
        component={EventDetail}
        options={({ route }) => ({ title: route.params.eventTitle })}
      />
       <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: true,
        }}
      />
       <Stack.Screen
        name="BlogDetail"
        component={BlogDetail}
        options={{
          headerShown: true,
          animation:"none"
        }}
      />
       <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: true,
        }}
      />
       <Stack.Screen
        name="MessageStack"
        component={MessageStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
