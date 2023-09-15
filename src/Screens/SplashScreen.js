//import liraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {Component, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import imagePath from '../constants/imagePath';

// create a component
const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {

    checkLogin();
   
  }, []);


  const checkLogin = async()=> {


    let token = await AsyncStorage.getItem("@token");
    console.log("KKKK", token)
    token = JSON.parse(token);
    if(token){
      setTimeout(() => {
        navigation.replace('BottomTabBar');
      }, 3000);
    }else {
      setTimeout(() => {
        navigation.replace('AuthStack');
      }, 3000);
    }
  }

  return (
    <View style={styles.container}>
    

    
      <Image source={imagePath.logo} style={{width:200}}   resizeMode="contain"/>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",
    height:"100%",
    justifyContent: 'center',
    alignItems: 'center',
   
  },
});

//make this component available to the app
export default SplashScreen;
