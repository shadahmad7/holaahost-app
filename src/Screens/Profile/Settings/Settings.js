import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, Dimensions, View, StyleSheet, Image, Pressable} from 'react-native';

import {ScrollView} from 'react-native-gesture-handler';
import colors from '../../../constants/colors';

export default function Settings() {
  const options = [
    {id: 1, name: 'About Us',screen:"About Us" },
    {id: 2, name: 'How We Work',screen:"We Work" },
    {id: 3, name: 'Privacy Policy',screen:"Privacy Policy" },
    {id: 4, name: 'Terms and Conditions', screen:"Terms Conditions"},
    // {id: 5, name: 'Refund Policy',screen:"Refund Policy"},
    {id: 5, name: 'Contact Us',screen:"Contact Us"},
  ];



  const navigation = useNavigation();



  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        {options.map((opt, index) => (
          <Pressable onPress={()=>navigation.navigate(opt.screen)}>

          <View style={styles.optionBox} >
            <Text style={styles.mainText}>{opt.name}</Text>
            {/* <Text style={styles.secondText}>{opt.selected}</Text> */}
          </View>
          </Pressable>
        ))}
            <Text style={[styles.mainText,{color:"#fff",flex:1,alignSelf:"center", paddingHorizontal:10,justifyContent:"center",
             alignContent:"center",textAlign:"center", alignItems:'center', paddingVertical:10, width:"38%",borderRadius:5,
             backgroundColor:"red", marginLeft:10,fontWeight:"500", marginVertical:10}]}>Delete Account</Text>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  optionBox: {
    marginHorizontal: 10,
    marginVertical: 15,
  },
  mainText: {
    fontSize: 16,
  },
  secondText: {
    fontSize: 14,
  },
});
