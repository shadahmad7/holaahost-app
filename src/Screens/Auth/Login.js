import {useNavigation} from '@react-navigation/native';
import {Text, ScrollView, View, StyleSheet} from 'react-native';
import SocialButton from '../../Components/SocialButton';
import colors from '../../constants/colors';
import imagePath from '../../constants/imagePath';
import React, { useState } from 'react';
import FloatingLabelTextInput from '../../Components/FloatingLabelTextInput';
import Button from '../../Components/Button';
import Toast from 'react-native-simple-toast';
import { loginAction, socialLoginAction } from '../../actions/authAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


GoogleSignin.configure({
  webClientId: '60259108637-7qlo2ffnvb759n4dapm9aca46p49dfv7.apps.googleusercontent.com',
});

export default function Login() {

  const navigation = useNavigation();
const [loading, setLoading]= useState(false);
const [email, setEmail] = useState("");
const [pass, setPass] = useState("");


const loginSubmit = async()=> {
  setLoading(true);
  if (!email) {
    Toast.show("Email can't be empty", Toast.LONG);
  } else if (!validateEmail(email)) {
    Toast.show("Invalid Email", Toast.LONG);
  } else if (!pass) {
    Toast.show("Password can't be empty", Toast.LONG);
  } else {
    let action= await loginAction(email, pass);
    console.log("here only", action)

    if (action.message === "Username Does not Found") {
      Toast.show("User not found", Toast.LONG);
    } else if (action.message === "Password Does not Found") {
      Toast.show("Password is wrong", Toast.LONG);
    } else if (action.status === 200) {
      
       auth()
        .signInWithEmailAndPassword(email, "12345678")
        .then(async(res) => {
          console.log("lofin  ressss", res);
        await AsyncStorage.setItem("@firebaseUser", JSON.stringify(res));
       
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }
      
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
      
          console.error(error);
        });
     
      setEmail("");
     setPass("");
     Toast.show("Login Successfully", Toast.LONG);
      // if (!action.access_token) {
      //  console.log("here only")
      // } else {
        setTimeout(() => {
          navigation.navigate("BottomTabBar")
        }, 2000);
      // }
    } else {
      Toast.show("Something went wrong", Toast.LONG);
    }
  }
  setTimeout(()=> {
    setLoading(false)
  },3000)

}






const onGoogleButtonPress = async()=> {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  console.log("gofff", idToken)
  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);


  console.log("gofff", googleCredential)
  // Sign-in the user with the credential
  let aaa = await auth().signInWithCredential(googleCredential);
  console.log("jeeeee", aaa.user);
  let user = aaa.user;

      // Firebase Setting
      await AsyncStorage.setItem(
        "@firebaseUser",
        JSON.stringify({ user: user })
      );

      let action = await socialLoginAction(user.email, "google");
      console.log("YYYYY", action);
      if (action.status === 200) {
        Toast.show("Login Successfully! Redirecting...", Toast.LONG);
        setTimeout(() => {
          navigation.navigate("BottomTabBar");
        }, 2000);
      } else {
        Toast.show("Something went wrong", Toast.LONG);
      }
   
  ///Handling Response 
  
}








const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};




  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Login using Email */}
        <FloatingLabelTextInput title="Email" secureTextEntry={false} onChangeText={(text)=> setEmail(text)} />
        <FloatingLabelTextInput title="Password" secureTextEntry={true} onChangeText={(text)=> setPass(text)} />
        {/* Login using Email */}

        <View style={styles.forgotPassword} onTouchEnd={()=> navigation.navigate('Forget Password')}>
          <Text style={styles.loginRedirectLink}>Forgot password?</Text>
        </View>
        <View style={styles.loginRedirectBox}>
          <Text style={styles.loginRedirect}>Didn't have an account?</Text>
          <Text
            style={styles.loginRedirectLink}
            onPress={() => navigation.navigate('Register')}>
            Sign up
          </Text>
        </View>
        <Button
          title="Login"
          disabled={loading}
          style={[styles.loginButton, styles.loginButtonText]}
          onPress={() => loginSubmit()}
        />
        <Button
          title="Login as Guest"
          disabled={loading}
          style={[styles.loginAsButton, styles.loginAsButtonText]}
          onPress={() => navigation.replace('BottomTabBar')}
        />

<View style={{flexDirection: 'row',marginHorizontal:20, marginVertical:10, alignItems: 'center'}}>
  <View style={{flex: 1, borderWidth:StyleSheet.hairlineWidth, backgroundColor: 'black'}} />
  <View>
    <Text style={{width: 50, textAlign: 'center'}}>OR</Text>
  </View>
  <View style={{flex: 1, borderWidth:StyleSheet.hairlineWidth, backgroundColor: 'black'}} />
</View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            alignItems: 'center',
          }}>
          <SocialButton
            title=""
            disabled={loading}
            image={imagePath.facebookLogo}
            style={[styles.socialButton, styles.socialButtonText]}
          />
          <SocialButton
          onPress={onGoogleButtonPress}
            title=""
            disabled={loading}
            image={imagePath.googleLogo}
            style={[
              [
                styles.socialButton,
                {
                  backgroundColor: 'transparent',
                  borderColor: colors.textGrey,
                  borderWidth: 1,
                  marginLeft: 10,
                },
              ],
              [styles.socialButtonText, {color: '#000'}],
            ]}
          />
        </View>
        <Text style={styles.termsText}>
          By continuing, you agree to Holaahost's{' '}
          <Text style={styles.loginRedirectLink}>Terms of Service.</Text> We
          will manage information about you as described in our
          <Text style={styles.loginRedirectLink}> Privacy Policy </Text>and
          <Text style={styles.loginRedirectLink}> Cookie Policy.</Text>
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 5,
  },
  socialButton: {
    width: '50%',
    marginTop: 20,
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: '#008DEF',
  },
  socialButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  signupText: {
    width: '80%',
    fontSize: 13,
    color: colors.textGrey,
    marginVertical: 20,
    textAlign: 'center',
    lineHeight: 20,
    alignSelf: 'center',
  },
  signupTextOption: {
    fontSize: 15,
    alignSelf: 'center',
    color: colors.textGrey,
    fontWeight: '400',
  },
  loginRedirectBox: {
    marginVertical: 20,
    alignSelf: 'center',
    width: '50%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  forgotPassword: {
    marginTop: 15,
    marginBottom: 5,
    alignSelf: 'flex-end',
    marginEnd:15
  },
  loginRedirect: {
    fontSize: 14,
    color: colors.textGrey,
  },
  loginRedirectLink: {
    fontSize: 14,
    marginLeft: 5,
    textDecorationLine: 'underline',
    color: colors.secondary,
  },
  termsText: {
    width: '90%',
    color: colors.textGrey,
    alignSelf: 'center',
    fontSize: 14,
    paddingVertical: 20,
    lineHeight: 20,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: colors.primary,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  loginButtonText: {
    color: '#fff',
    alignItems: 'center',
  },
  loginAsButton: {
    borderColor:colors.secondary,
    borderWidth:1,
    backgroundColor:"transparent",
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  loginAsButtonText: {
    color: colors.secondary,
    alignItems: 'center',
  },
});
