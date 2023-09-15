import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, View, ImageBackground, StyleSheet} from 'react-native';
import Button from '../Components/Button';
import colors from '../constants/colors';
import imagePath from '../constants/imagePath';


export default function Splash() {
 
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={imagePath.SplashImage}
        ResizeMode="cover"
        style={styles.image}>
        <View style={styles.buttonContainer}>
          <Button
            title="Continue as guest"
            style={[styles.guestButton, styles.guestButtonText]}
            onPress={() => navigation.navigate("BottomTabBar")}
          />
          <Button
            title="Log in"
            style={[styles.loginButton, styles.loginButtonText]}
            onPress={() => navigation.navigate("SignIn")}
          />
          <Button
            title="Sign Up"
            style={[styles.signupButton, styles.signupButtonText]}
            onPress={() => navigation.navigate("SignUp")}
            
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  buttonContainer: {
    flexDirection: 'column-reverse',
    flex: 1,
    marginBottom: 20,
    bottom: 0,
    left: 0,
  },
  loginButton: {
    backgroundColor: colors.secondary,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  loginButtonText: {
    color: '#fff',
    alignItems: 'center',
  },
  signupButton: {
    backgroundColor: colors.primary,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  signupButtonText: {
    color: '#fff',
    alignItems: 'center',
  },
  guestButton: {
    backgroundColor: 'transparent',
    paddingVertical: 4,
    paddingHorizontal: 6,
    width: 'auto',
    alignSelf: 'center',
    alignContent: 'center',
    marginVertical: 10,
  },
  guestBottomText: {
    marginVertical: 10,
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
