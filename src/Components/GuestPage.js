import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../constants/colors';
import Button from './Button';

export default function GuestPage(props) {
//   console.log('JKNJKN', props);
const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <View style={styles.boxContainer}>
          <Image source={props.image} style={styles.image} />
          <Text style={styles.headerText}>{props.title}</Text>
          <Text style={styles.subHeaderText}>{props.subTitle}</Text>
          <Button title="Sign up" style={[styles.button, styles.buttonText]}  onPress={()=> navigation.navigate("Register")} />
          <View style={styles.messageBox}>
            <Text style={styles.loginMessage}>Already a memeber?</Text>
            <Text style={styles.loginMessageLink} onPress={()=> navigation.navigate("Login")}>Login</Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent:'center'
  },
  boxContainer: {
    alignItems: 'center',
  },
  headerText: {
    lineHeight: 40,
    marginTop: 25,
    width: '70%',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '600',
  },
  subHeaderText: {
    marginTop: 10,
    lineHeight: 18,
    width: '70%',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
  },
  loginMessage: {
    color: '#000',

  },
  button: {
    backgroundColor: colors.primary,
    width: '30%',
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
  },

  image: {
    width: 100,
    height: 100,
  },

  loginMessageLink: {
    color: colors.primary,
    marginLeft: 5,
    fontWeight: '500',
  },
  messageBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
