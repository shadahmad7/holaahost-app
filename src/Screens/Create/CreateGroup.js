//import liraries
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import FloatingLabelTextInput from '../../Components/FloatingLabelTextInput';
import colors from '../../constants/colors';
import Button from '../../Components/Button';
import {Picker} from '@react-native-picker/picker';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import {launchImageLibrary} from 'react-native-image-picker';
import { getAllGroupCategories } from '../../actions/groupCategoryAction';
import { createGroup } from '../../actions/groupAction';
import { useNavigation } from '@react-navigation/native';

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const categoriess = [
  {
    label: 'Select',
    value: '',
  },
];

let lat, long;
// create a component
const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [groupImage, setGroupImage] = useState(null);
  const [groupLocation, setGroupLocation] = useState({});
  const [groupCategory, setGroupCategory] = useState('');

  const [groupDescription, setGroupDescription] = useState('');

  const navigation = useNavigation();


  const [loader, setLoader] = useState(false);

  React.useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoader(true);
    let action,
      i,
      arr = [];
    action = await getAllGroupCategories();
    action = action.data.data;
    for (i = 0; i < action.length; i++) {
      categoriess.push({
        label: action[i].group_category_name,
        value: action[i].id,
      });
    }
    console.log('categpryyyyyyyyy', categoriess);
    await AsyncStorage.removeItem('@createdEvent');
    await AsyncStorage.removeItem('@joinGroup');
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  };

  

  const pickImage = async () => {
    launchImageLibrary(options, response => {
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
  };

  const uploadImage = async res => {
    console.log('hereeee', res);
    let groupPic = {
      uri: res?.assets[0].uri,
      type: res?.assets[0].type,
      name: res?.assets[0].fileName,
    };

    setGroupImage(groupPic);
    console.log('hereeee', groupPic);
  };

  const onLocationSelected = (data, details) => {
    console.log('heree', data, details);
    console.log('heree', details);
    setGroupLocation(data.description);
    lat = details.geometry.location.lat;
    long = details.geometry.location.lng;
    console.log('heree', lat, long);
  };

  const pickerItems = categoriess.map((cat, index) => (
    <Picker.Item key={index} label={cat.label} value={cat.value} />
  ));


  const createGroupp = async () => {
    console.log('Group NAme', groupName);
    console.log('Group Location', groupLocation);
   
    console.log('Group Cat', groupCategory);
 
    console.log('Group Image', groupImage);
    console.log('Group Description', groupDescription);

  

    if (
      !groupName ||
      !groupLocation ||
      !groupCategory ||
      !groupImage ||
      !groupDescription
    ) {
      Toast.show('Every fields are required', Toast.LONG);
    } else {
      console.log('Group NAme', groupName);
      console.log('Group Location', groupLocation);
      console.log('Group Lat', lat);
      console.log('Group Long', long);
     
      console.log('Group Cat', groupCategory);
   
      console.log('Group Image', groupImage);
      console.log('Group Description', groupDescription);

      let groupCreateResponse = await createGroup(
        groupName,
      groupImage,
      groupLocation,
      lat,
     long,
      groupCategory,
      groupDescription
      );
      console.log("API RES GROUP CREATE", groupCreateResponse);

      if(groupCreateResponse.status === 200){
        setGroupName('');

        Toast.show('Group Created Successfully', Toast.LONG);
        setTimeout(() => {
  navigation.navigate("Groups", {
    groupCatId: groupCreateResponse.data.group_category_id,
  })
        }, 2000);
      }
    }
  };

  return (
    <>
      {!loader ? (
        <View style={styles.container}>
          <ScrollView>
            {/* Login using Email */}
            <FloatingLabelTextInput
              title="Group Name"
              secureTextEntry={false}
              onChangeText={text => setGroupName(text)}
            />

            <ScrollView horizontal>
              <View
                style={{
                  borderBottomWidth: 1,
                  width: 350,
                  marginHorizontal: 15,
                  marginTop: 20,
                }}>
                <GooglePlacesAutocomplete
                  placeholder="Group Location"
                  value={groupLocation}
                  keepResultsAfterBlur={true}
                  // textInputProps={{ onBlur: () => { console.warn("Blur") } }}
                  onPress={(data, details) => {
                    onLocationSelected(data, details);
                  }}
                  fetchDetails={true}
                  query={{
                    key: 'AIzaSyCUFpLoJk2bo-V4gzaPkNix9npBV-_HAoo',
                    language: 'en',
                  }}
                />
              </View>
            </ScrollView>

            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownLabel}>Group Category</Text>
              <View style={{borderWidth: 1}}>
                <Picker
                  style={{borderWidth: 1, borderRadius: 5, borderColor: '#000'}}
                  selectedValue={groupCategory}
                  onValueChange={(itemValue, itemIndex) => {
                    console.log('hereee', itemValue),
                      setGroupCategory(itemValue);
                  }}>
                  {pickerItems}
                </Picker>
              </View>
            </View>


           

            {/* Image */}
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownLabel}>Group Image</Text>
              {!groupImage ? (
                <TouchableOpacity
                  style={{
                    marginHorizontal: 10,
                    marginVertical: 10,
                    padding: 10,
                  }}
                  onPress={() => pickImage()}>
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/128/833/833281.png',
                    }}
                    style={{width: 30, height: 30}}
                  />
                </TouchableOpacity>
              ) : (
                <>
                  <Image
                    source={{uri: groupImage.uri}}
                    style={{width: 200, height: 200}}
                  />
                  <TouchableOpacity
                    onPress={() => pickImage()}
                    style={{
                      paddingHorizontal: 4,
                      paddingVertical: 10,
                      borderRadius: 5,
                      backgroundColor: 'red',
                      alignItems: 'center',
                      width: 120,
                      justifyContent: 'center',
                      borderWidth: 0.4,
                      paddingVertical: 4,
                      margin: 10,
                    }}>
                    <Text style={{color: '#fff'}}>Choose Another</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
            {/* Image */}

            <FloatingLabelTextInput
              title="Group Description"
              secureTextEntry={false}
              multiline={true}
              numberOfLines={6}
              onChangeText={text => setGroupDescription(text)}
            />

            {/* Login using Email */}


            <Button
              title="Create Group"
              style={[styles.loginButton, styles.loginButtonText]}
              onPress={() => createGroupp()}
            />
          </ScrollView>

        </View>
      ) : (
        <View
          style={{
            flex: 1,

            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 5,
  },

  loginButton: {
    backgroundColor: colors.primary,
    width: '90%',
    alignSelf: 'center',
    justifyContent:"flex-end",
    marginVertical: 10,
  },
  loginButtonText: {
    color: '#fff',
    alignItems: 'center',
  },
  dropdownContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  dropdownLabel: {
    fontSize: 16,
    fontWeight: '500',
    padding: 5,
    marginVertical: 10,
  },
});

export default CreateGroup;
