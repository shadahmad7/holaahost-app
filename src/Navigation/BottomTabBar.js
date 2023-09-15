import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

// import Icon from 'react-native-vector-icons/FontAwesome'
const Tab = createBottomTabNavigator();

import HomeStack from './HomeStack';
import ExploreStack from './ExploreStack';
import NotificationStack from './NotificationStack';
import MessageStack from './MessageStack';
import colors from '../constants/colors';
import ProfileStack from './ProfileStack';

export default function BottomTabBar() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: '#fff',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            <FontAwesome5Icon
              name="home"
              color={focused ? colors.primary : 'grey'}
              size={19}
              light
            />
          ),
        }}
      />
      
      <Tab.Screen
        name="Message"
        component={MessageStack}
        options={{
          tabBarLabel: 'Message',
          tabBarIcon: ({focused}) => (
            <FontAwesome5Icon
              name="envelope"
              color={focused ? colors.primary : 'grey'}
              size={19}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationStack}
        options={{
          tabBarLabel: 'Notification',
          tabBarIcon: ({focused}) => (
            <FontAwesome5Icon
              name="bell"
              color={focused ? colors.primary : 'grey'}
              size={19}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused}) => (
            <FontAwesome5Icon
              name="user"
              color={focused ? colors.primary : 'grey'}
              size={19}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
