import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {
  Text,
  Dimensions,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import navigationStrings from '../../constants/navigationStrings';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import StackCard from '../../Components/StackCard';
import Label from '../../Components/Label';
import {ScrollView} from 'react-native-gesture-handler';
import colors from '../../constants/colors';
import FloatingLabelTextInput from '../../Components/FloatingLabelTextInput';
import {Switch} from 'react-native-paper';
import Button from '../../Components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {myProfile, updateProfile, updateProfilePIc} from '../../actions/profileAction';

import Toast from 'react-native-simple-toast';
import auth from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';
import {api} from '../../config/api';

import { launchImageLibrary } from 'react-native-image-picker';

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

let profilePic="";
let facebook = '',
  twitter = '',
  youtube = '',
  instagram = '';
export default function EditProfile() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [pic, setPic] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [data, setData] = useState({});

  const [photo, setPhoto] = React.useState(null);

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    let userData = await myProfile();
    console.log('herwwweee', userData);

    if (userData) {
      setData(userData);
      setName(userData.name);
      setBio(userData.bio);
      // userData = JSON.parse(userData);
      setPic(userData?.photoUrl);
      console.log('userrrr', userData, name, bio);
    }

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };


  const pickImage = async () => {
  launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        
        uploadImage(response);
      }
    });
  }
  



const uploadImage = async(res) => {
   
  
  
  
  console.log("hereeee", res);
  profilePic = {
    uri: res?.assets[0].uri,
    type: res?.assets[0].type,
    name: res?.assets[0].fileName,
  };

   
    console.log("hereeee", profilePic);


    let action = await updateProfilePIc(profilePic);
    console.log("aaaaaa", action);

    await AsyncStorage.setItem("@user", JSON.stringify({id:action?.data.id, email:action?.data.email, name:action?.data.name, social:action?.data.social,photoUrl:action?.data.photoUrl}));
    
    let a = await AsyncStorage.getItem("@firebaseUser");
     a = JSON.parse(a);


     auth()
     .signInWithEmailAndPassword(action?.data.email, '12345678')
     .then(async res => {
       if (res.user) {
       
         firestore().collection('users').doc(res.user.uid).update({
          photoURL: api.imageUrl+action?.data.photoUrl,
         });
         await res.user.updateProfile({
          photoURL: api.imageUrl+action?.data.photoUrl,
        });
       }
     })
     .catch(error => {
       Toast.show('Something went wrong', Toast.LONG);
       console.error(error);
     });


     auth()
     .signInWithEmailAndPassword(action?.data.email, '12345678')
     .then(async res => {
       if (res.user) {
        await AsyncStorage.setItem("@firebaseUser", JSON.stringify(res));
       }
     })
     .catch(error => {
       Toast.show('Something went wrong', Toast.LONG);
       console.error(error);
     });




     Toast.show('Profile Picture Updated Successfully!', Toast.LONG);
    loadData();
    // console.log("res update pic", action);
  };




  const onSubmitUpdate = async () => {
    setLoading(true);
    console.log('jhereee', name, bio);
    let updateProfileRes = await updateProfile(
      name,
      bio,
      facebook,
      twitter,
      instagram,
      youtube,
    );
    console.log('res update profile', updateProfileRes);

    await AsyncStorage.setItem(
      '@user',
      JSON.stringify({
        id: updateProfileRes?.data.id,
        email: updateProfileRes?.data.email,
        name: updateProfileRes?.data.name,
        social: updateProfileRes?.data.social,
        photoUrl: updateProfileRes?.data.photoUrl,
      }),
    );
    let a = await AsyncStorage.getItem('@firebaseUser');
    let res = JSON.parse(a);

    auth()
      .signInWithEmailAndPassword(updateProfileRes?.data.email, '12345678')
      .then(async res => {
        if (res.user) {
          await res.user.updateProfile({
            displayName: name,
          });

          firestore().collection('users').doc(res.user.uid).update({
            displayName: name,
          });
        }
      })
      .catch(error => {
        Toast.show('Something went wrong', Toast.LONG);
        console.error(error);
      });

    loadData();
    Toast.show('Your Profile Updated Successfully!', Toast.LONG);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <>
      {!loading ? (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <ScrollView>
            <View style={styles.bioSection}>
              <View>
                <Image
                  style={styles.image}
                  source={{
                    uri: pic
                      ? api.imageUrl + pic
                      : 'https://cdn-icons-png.flaticon.com/128/149/149071.png',
                  }}
                />
                <TouchableOpacity
                  style={{
                    padding: 2,
                    position: 'absolute',
                    right: 45,
                    bottom: -5,
                    borderWidth: 1,
                    borderRadius: 40,
                    backgroundColor: '#f7f7f7',
                  }}
                  onPress={()=>pickImage()}>
                  <Icon name="user" size={16} color="#000" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{marginHorizontal: -10}}>
              <FloatingLabelTextInput
                defaultValue={name}
                title="Name"
                secureTextEntry={false}
                onChangeText={text => setName(text)}
              />
              <FloatingLabelTextInput
                defaultValue={bio}
                title="Bio"
                secureTextEntry={false}
                onChangeText={text => setBio(text)}
              />
              {/* <FloatingLabelTextInput value={"https://www.youtube.com/"}  title="Twitter" secureTextEntry={false} />
          <FloatingLabelTextInput value={"https://www.youtube.com/"}  title="Instagram" secureTextEntry={false} />
          <FloatingLabelTextInput value={"https://www.youtube.com/"}  title="Youtube" secureTextEntry={false} /> */}
            </View>
            <View style={{marginVertical: 20}}>
              <Button
                title="Update"
                style={[styles.loginButton, styles.loginButtonText]}
                onPress={() => onSubmitUpdate()}
              />
            </View>
          </ScrollView>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            // marginTop: '50%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
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
    marginVertical: 20,
    width: '70%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  loginButtonText: {
    color: '#fff',
    alignItems: 'center',
  },
});
