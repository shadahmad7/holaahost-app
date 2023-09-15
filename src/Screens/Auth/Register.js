import {useNavigation} from '@react-navigation/native';
import {Text, ScrollView, View, StyleSheet} from 'react-native';
import SocialButton from '../../Components/SocialButton';
import colors from '../../constants/colors';
import imagePath from '../../constants/imagePath';
import React, {useState} from 'react';
import FloatingLabelTextInput from '../../Components/FloatingLabelTextInput';
import Button from '../../Components/Button';
import Toast from 'react-native-simple-toast';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { loginAction, registerAction } from '../../actions/authAction';

import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import firestore from '@react-native-firebase/firestore';

GoogleSignin.configure({
  webClientId: '60259108637-7qlo2ffnvb759n4dapm9aca46p49dfv7.apps.googleusercontent.com',
});


export default function Register() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [name, setName] = useState("")
  const [confirm, setConfirm] = useState("")



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
    let action = await registerAction(
      user.displayName,
      user.email,
      pass,
      user.photoURL,
      "Google"
    );
    console.log("YYYYY", action.email[0].status);


    ///Handling Response 
    if (action.email[0].status === "409") {
      Toast.show("Email already exists", Toast.LONG);
    } else if (action.status === 200) {
      if (action.data.access_token === undefined) {
        console.log("HERE");
      } else {
        // Firebase Register
        await AsyncStorage.setItem(
          "@firebaseUser",
          JSON.stringify({ user: user })
        );
       
        //Setting Firestore
        //Create User Doc
        firestore().collection("users")
        .doc(user.uid)
        .set({
          uid: user.uid,
          displayName: user.displayName,
          email:user.email,
          photoURL: user.photoURL,
        });
        
        //Create Chat Doc
        firestore().collection("userChats")
        .doc(user.uid)
        .set({});
        
        

        Toast.show("Registered Successfully...", Toast.LONG);
        setTimeout(() => {
          navigation.navigate("BottomTabBar")
        }, 2000);
      }
    } else {
      Toast.show("Something went wrong", Toast.LONG);
      
    }
    
    ///Handling Response 
    
  }


 const onRegister = async()=> {
  setLoading(true);
  // Validation
  if(!name){
    Toast.show("Name can't be empty", Toast.LONG);
  } else if(!email){
    Toast.show("Email can't be empty", Toast.LONG);

  } else if (!validateEmail(email)) {
    Toast.show("Invalid Email", Toast.LONG);

  } else if(!pass){
    Toast.show("Password can't be empty", Toast.LONG);

  } else if(pass.length < 8){
    Toast.show("Password should be 8 in length", Toast.LONG);

  } else if (pass != confirm){
    Toast.show("Passwords dont't match", Toast.LONG);

  } else {


        // Registeration Processs Starts

    console.log("jnjkfnfjf", name, email, pass);

    // Registeration API
    let action = await registerAction(name, email, pass, "","")

    if (action.hasOwnProperty("email")) {
      Toast.show("Email Already Exists", Toast.LONG);

    } else if (action.status === 200) {


      auth()
      .createUserWithEmailAndPassword(email, "12345678")
      
      .then(async(res) => {
        if(res.user){
  
          //Update Profile
          res.user.updateProfile({
            displayName: name,
            photoURL:"https://cdn-icons-png.flaticon.com/128/149/149071.png"
          })
   
          //Setting Firestore
           //Create User Doc
          firestore().collection("users")
          .doc(res.user.uid)
          .set({
            uid: email,
            displayName: name,
            email:email,
            photoURL: 'https://cdn-icons-png.flaticon.com/128/149/149071.png',
          });
          
          //Create Chat Doc
          firestore().collection("userChats")
          .doc(res.user.uid)
          .set({});
        }
        console.log("Create User Response", res);
      await AsyncStorage.setItem("@firebaseUser", JSON.stringify(res));
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Toast.show("Email Already Exists", Toast.LONG);
          console.log('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          Toast.show("Invalid Email", Toast.LONG);
        }
        console.error(error);
      });


      // Login API
      let action2 = await loginAction(email, pass);
      console.log("action 2", action2);
      if (action2?.access_token) {
        setName("");
        setEmail("");
        setPass("");
        setConfirm("");
        Toast.show("Register Successfully", Toast.LONG);
        setTimeout(() => {
          navigation.navigate("BottomTabBar")
        }, 2000);
      } 
    } else {
      Toast.show("Something went wrong", Toast.LONG);
    }

   


// Registeration Processs Endss

  }
  setTimeout(()=> {
    setLoading(false)
  },3000)

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
        <FloatingLabelTextInput title="Name" secureTextEntry={false} onChangeText={(text)=> setName(text)} />
        <FloatingLabelTextInput title="Email" secureTextEntry={false} onChangeText={(text)=> setEmail(text)} />
        <FloatingLabelTextInput title="Password" secureTextEntry={true} onChangeText={(text)=> setPass(text)} />
        <FloatingLabelTextInput
          title="Confirm Password"
          secureTextEntry={true}
          onChangeText={(text)=> setConfirm(text)}
        />
        {/* Login using Email */}

        <View style={styles.forgotPassword}>
          <Text style={styles.loginRedirectLink}>Forgot password?</Text>
        </View>
        <View style={styles.loginRedirectBox}>
          <Text style={styles.loginRedirect}>Already have an account?</Text>
          <Text
            style={styles.loginRedirectLink}
            onPress={() => navigation.navigate('Login')}>
            Login
          </Text>
        </View>
        <Button
          disabled={loading}
          title="Register"
          style={[styles.loginButton, styles.loginButtonText]}
          onPress={() => onRegister()}
        />

        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            marginVertical: 10,
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 1,
              borderWidth: StyleSheet.hairlineWidth,
              backgroundColor: 'black',
            }}
          />
          <View>
            <Text style={{width: 50, textAlign: 'center'}}>OR</Text>
          </View>
          <View
            style={{
              flex: 1,
              borderWidth: StyleSheet.hairlineWidth,
              backgroundColor: 'black',
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            alignItems: 'center',
          }}>
          <SocialButton
          disabled={loading}
            title=""
            image={imagePath.facebookLogo}
            style={[styles.socialButton, styles.socialButtonText]}
          />

        

          <SocialButton
              onPress={onGoogleButtonPress}
            disabled={loading}
            title=""
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
    backgroundColor: '#ffffff',

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
    alignSelf: 'center',
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
    lineHeight: 20,
    textAlign: 'center',
    paddingVertical: 20,
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
});
