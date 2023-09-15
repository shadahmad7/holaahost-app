import {createNativeStackNavigator} from '@react-navigation/native-stack';

import React from 'react';
import UserProfile from '../Screens/Profile/UserProfile';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import EditProfile from '../Screens/Profile/EditProfile';

//Settings
import Settings from '../Screens/Profile/Settings/Settings'
import PrivacyPolicy from '../Screens/Profile/Settings/PrivacyPolicy'
import AboutUs from '../Screens/Profile/Settings/AboutUs'
import RefundPolicy from '../Screens/Profile/Settings/RefundPolicy'
import TermsAndConditions from '../Screens/Profile/Settings/TermsAndConditions'
import ContactUs from '../Screens/Profile/Settings/ContactUs'
import ChangePassword from '../Screens/Profile/ChangePassword';
import MyGroups from '../Screens/Profile/MyGroups';
import MyEvents from '../Screens/Profile/MyEvents';
import Payments from '../Screens/Profile/Payments';
import BankAccount from '../Screens/Profile/BankAccount';
import HowWeWork from '../Screens/Profile/Settings/HowWeWork';
import AuthStack from './AuthStack';
import Login from '../Screens/Auth/Login';
import Register from '../Screens/Auth/Register';
import Achievement from '../Screens/Profile/Achievement';


const Stack = createNativeStackNavigator();

function ActionBarIcon() {
  return (
    <Icon name="settings" size={22} color="#000" style={{marginLeft: 10}} />
  );
}





export default function ProfileStack() {
  const navigation = useNavigation();

  
  

  
  return (
  
      <Stack.Navigator  screenOptions={{headerShown: true}}>
        <Stack.Screen name="Profile" component={UserProfile} 
         options={{
          headerRight: props => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Settings')}>
              <ActionBarIcon {...props} />
            </TouchableOpacity>
          ),
        }}
        headerShown={true} 
        />
      
        <Stack.Screen name="Edit Profile" 
        component={EditProfile} 
       
        headerShown={true} />
        <Stack.Screen name="Change Password" 
        component={ChangePassword} 
       
        headerShown={true} />


<Stack.Screen name="Achievement" component={Achievement} headerShown={true} />
<Stack.Screen name="My Groups" component={MyGroups} headerShown={true} />
<Stack.Screen name="My Events" component={MyEvents} headerShown={true} />
<Stack.Screen name="Payments" component={Payments} headerShown={true} />
<Stack.Screen name="Bank Account" component={BankAccount} headerShown={true} />

<Stack.Screen name="Register" component={Register} headerShown={true} />
<Stack.Screen name="Login" component={Login} headerShown={true} />
<Stack.Screen name="Settings" component={Settings} headerShown={true} />
      <Stack.Screen name="Privacy Policy" component={PrivacyPolicy} headerShown={true} />
      <Stack.Screen name="We Work" component={HowWeWork} headerShown={true} />
      <Stack.Screen name="About Us" component={AboutUs} headerShown={true} />
      <Stack.Screen name="Refund Policy" component={RefundPolicy} headerShown={true} />
      <Stack.Screen name="Terms Conditions" component={TermsAndConditions} headerShown={true} />
      <Stack.Screen name="Contact Us" component={ContactUs} headerShown={true} />
       
      </Stack.Navigator>
    
  );
}
