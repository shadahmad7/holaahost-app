import {useNavigation} from '@react-navigation/core';
import React from 'react';
import { View, StyleSheet} from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';

import colors from '../../../constants/colors';
import FloatingLabelTextInput from '../../../Components/FloatingLabelTextInput';

import Button from '../../../Components/Button';

export default function ContactUs() {

  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
   

        <View style={{marginHorizontal:-10}}>
        <FloatingLabelTextInput  title="Name" secureTextEntry={false} />
          <FloatingLabelTextInput title="Email" secureTextEntry={false} />
          <FloatingLabelTextInput title="Message" multiline={true} numberOfLines={5}  secureTextEntry={false} />
        
        </View>
        <View style={{marginVertical:20}}>
        <Button
          title="Send"
          style={[styles.loginButton, styles.loginButtonText]}
          onPress={() => loginSubmit()}
        />
        </View>
       
 
     
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bioSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  
  image: {
    width: 120,
    borderRadius: 100,
    height: 120,
    marginBottom: 5,
  },
  email: {
    marginBottom: 8,
    fontSize: 16,

    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: colors.primary,
    marginVertical:20,
    width: '70%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  loginButtonText: {
    color: '#fff',
    alignItems: 'center',
  },
 
});
