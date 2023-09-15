import {useNavigation} from '@react-navigation/core';
import React, { useState } from 'react';
import {Text, Dimensions, View, StyleSheet, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import navigationStrings from '../../constants/navigationStrings';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import StackCard from '../../Components/StackCard';
import Label from '../../Components/Label';
import { ScrollView } from 'react-native-gesture-handler';
import colors from '../../constants/colors';
import FloatingLabelTextInput from '../../Components/FloatingLabelTextInput';
import { Switch } from 'react-native-paper';
import Button from '../../Components/Button';
import Toast from 'react-native-simple-toast';
import { updatePassword } from '../../actions/profileAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../../actions/authAction';

export default function ChangePassword() {


  const navigation = useNavigation();
  const [loader, setLoader]= useState(false);
  const [oldPass, setOldPass]= useState("");
  const [newPass, setNewPass]= useState("");
  const [confirmNewPass, setConfirmNewPass]= useState("");


  const onUpdatePassword = async()=> {
    
if(!oldPass){
  Toast.show('Please enter current password', Toast.LONG);

} else if(!newPass){
  Toast.show('Please enter new password', Toast.LONG);

} else if(!confirmNewPass){
  Toast.show('Please confirm new password', Toast.LONG);

} else if(oldPass.length < 7){
  Toast.show('Old password should be 8 in characters', Toast.LONG);

}  else if(newPass.length < 7){
  Toast.show('New password should be 8 in characters', Toast.LONG);
} else if(newPass!= confirmNewPass){
  Toast.show("Passwords don't match", Toast.LONG);
} else {
  setLoader(true);
  let updatePassRes = await updatePassword(oldPass, newPass);

  if(updatePassRes.status === 200){
    console.log("res update profile", updatePassRes);
    Toast.show("Password Updated Successfully!", Toast.LONG);

    logout();
    // await AsyncStorage.removeItem("@token");
    // await AsyncStorage.removeItem("@user");
    // await AsyncStorage.removeItem("@firebaseUser");

   
  } else {
    Toast.show("Password is wrong!", Toast.LONG);

  }
}

setTimeout(()=> {
  setLoader(false);

},2000)
  }





  return (
    <>
    {!loader ? ( 
      <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
   

        <View style={{marginHorizontal:-10}}>
        <FloatingLabelTextInput  title="Current Password" secureTextEntry={false} onChangeText={(text)=> setOldPass(text)} />
          <FloatingLabelTextInput title="New Password" secureTextEntry={false}  onChangeText={(text)=> setNewPass(text)} />
          <FloatingLabelTextInput title="Comfirm New Password"  secureTextEntry={false} onChangeText={(text)=> setConfirmNewPass(text)} />
        
        </View>
        <View style={{marginVertical:20}}>
        <Button
          title="Update"
          style={[styles.loginButton, styles.loginButtonText]}
          onPress={() => onUpdatePassword()}
        />
        </View>
       
 
     
      </ScrollView>
    </View>
    ):(
      <View style={{justifyContent:"center", flex:1,  alignItems:'center'}}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
    )}

    </>
   
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
