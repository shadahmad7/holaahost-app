//import liraries
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Touchable,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import FloatingLabelTextInput from '../../Components/FloatingLabelTextInput';
import colors from '../../constants/colors';
import Button from '../../Components/Button';
import {Picker} from '@react-native-picker/picker';
import {types} from '@babel/core';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment/moment';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAllEventCategories} from '../../actions/eventCategoryAction';
import Toast from 'react-native-simple-toast';
import {launchImageLibrary} from 'react-native-image-picker';
import {createEvent} from '../../actions/eventAction';
import {useNavigation} from '@react-navigation/native';

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
const CreateEvent = () => {
  const [eventName, setEventName] = useState('');
  const [eventImage, setEventImage] = useState(null);
  const [eventLocation, setEventLocation] = useState({});
  const [eventAddress, setEventAddress] = useState('');
  const [eventContact, setEventContact] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventCategory, setEventCategory] = useState('');
  const [eventSlot, setEventSlot] = useState('');
  const [eventRsvp, setEventRsvp] = useState('');
  const [eventPrice, setEventPrice] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventFree, setEventFree] = useState('');

  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [showPicker2, setShowPicker2] = useState(false);

  const [endDate, setEndDate] = useState(new Date());
  const [showPicker3, setShowPicker3] = useState(false);
  const [endTime, setEndTime] = useState(new Date());
  const [showPicker4, setShowPicker4] = useState(false);

  const [loader, setLoader] = useState(false);

  const navigation = useNavigation();

  React.useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoader(true);
    let action,
      i,
      arr = [];

    action = await getAllEventCategories();
    action = action.data.data;
    for (i = 0; i < action.length; i++) {
      categoriess.push({
        label: action[i].event_category_name,
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

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setStartDate(currentDate);
  };

  const onChange2 = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowPicker2(false);
    setStartTime(currentTime);
  };

  const onChange3 = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker3(false);
    setEndDate(currentDate);
  };

  const onChange4 = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowPicker4(false);
    setEndTime(currentTime);
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
    let eventPic = {
      uri: res?.assets[0].uri,
      type: res?.assets[0].type,
      name: res?.assets[0].fileName,
    };

    setEventImage(eventPic);
    console.log('hereeee', eventPic);
  };

  const onLocationSelected = (data, details) => {
    console.log('heree', data, details);
    console.log('heree', details);
    setEventLocation(data.description);
    lat = details.geometry.location.lat;
    long = details.geometry.location.lng;
    console.log('heree', lat, long);
  };

  const pickerItems = categoriess.map((cat, index) => (
    <Picker.Item key={index} label={cat.label} value={cat.value} />
  ));

  const createDateTime = async (timestamp1, timestamp2) => {
    const timestampp1 = new Date(timestamp1);
    const timestampp2 = new Date(timestamp2);

    // Extract the date and time parts from the first timestamp
    const [date1, time1] = timestampp1.toISOString().split('T');

    // Extract the date and time parts from the second timestamp
    const [date2, time2] = timestampp2.toISOString().split('T');

    console.log('FINALLL', date1, time2);

    let final = `${date1}T${time2}`;
    console.log('FINALLL', final);
    return final;
  };

  const createEventtt = async () => {
    console.log('Evvent NAme', eventName);
    console.log('Evvent Location', eventLocation);
    console.log('Evvent Addrress', eventAddress);
    console.log('Evvent Event Type', eventType);
    console.log('Evvent Event Cat', eventCategory);
    console.log('Evvent RSVP', eventRsvp);
    console.log('Evvent Free', eventFree);
    console.log('Evvent Slot', eventSlot);
    console.log('Evvent Start Date', startDate);
    console.log('Evvent Start Time', startTime);
    console.log('Evvent End Time', endDate);
    console.log('Evvent End Time', endTime);
    console.log('Evvent Image', eventImage);
    console.log('Evvent Description', eventDescription);

    let startDateTime = await createDateTime(startDate, startTime);
    let endDateTime = await createDateTime(endDate, endTime);
    console.log('Evvent Start & ENd', startDateTime, endDateTime);

    if (
      !eventName ||
      !eventLocation ||
      !eventAddress ||
      !eventType ||
      !eventCategory ||
      !eventRsvp ||
      !eventFree ||
      !eventSlot ||
      !startDate ||
      !startTime ||
      !endDate ||
      !endTime ||
      !eventImage ||
      !eventDescription
    ) {
      Toast.show('Every fields are required', Toast.LONG);
    } else {
      console.log('Evvent NAme', eventName);
      console.log('Evvent Location', eventLocation);
      console.log('Evvent Addrress', eventAddress);
      console.log('Evvent Event Type', eventType);
      console.log('Evvent Event Cat', eventCategory);
      console.log('Evvent RSVP', eventRsvp);
      console.log('Evvent Free', eventFree);
      console.log('Evvent Slot', eventSlot);
      console.log('Evvent Start Date', startDate);
      console.log('Evvent Start Time', startTime);
      console.log('Evvent End Time', endDate);
      console.log('Evvent End Time', endTime);
      console.log('Evvent Image', eventImage);
      console.log('Evvent Description', eventDescription);

      let startDateTime = await createDateTime(startDate, startTime);
      let endDateTime = await createDateTime(endDate, endTime);
      console.log('Evvent Start & ENd', startDateTime, endDateTime);

      let eventCreateResponse = await createEvent(
        eventName,
        eventLocation,
        lat,
        long,
        eventAddress,
        eventContact,
        eventType,
        eventCategory,
        eventRsvp,
        eventFree,
        eventPrice,
        eventSlot,
        startDateTime,
        endDateTime,
        eventImage,
        eventDescription
      );
      console.log("API RES EVENT CREATE", eventCreateResponse);

      await AsyncStorage.setItem("@createdEvent", JSON.stringify(eventCreateResponse));
      setEventName('');
      Toast.show('Event Created Successfully', Toast.LONG);
      setTimeout(() => {
        navigation.navigate('Make Payment');
      }, 2000);
    }
  };

  return (
    <>
      {!loader ? (
        <View style={styles.container}>
          <ScrollView>
            {/* Login using Email */}
            <FloatingLabelTextInput
              title="Event Name"
              secureTextEntry={false}
              onChangeText={text => setEventName(text)}
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
                  placeholder="Enter Location"
                  value={eventLocation}
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

            <FloatingLabelTextInput
              title="Event Address"
              secureTextEntry={false}
              onChangeText={text => setEventAddress(text)}
            />
            <FloatingLabelTextInput
              title="Event Contact"
              keyboardType={'numeric'}
              onChangeText={text => setEventContact(text)}
            />
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownLabel}>Event Type</Text>
              <View style={{borderWidth: 1}}>
                <Picker
                  style={{borderWidth: 1, borderRadius: 5, borderColor: '#000'}}
                  selectedValue={eventType}
                  onValueChange={(itemValue, itemIndex) =>
                    setEventType(itemValue)
                  }>
                  <Picker.Item label="Select" value="" />

                  <Picker.Item label="Indoor" value="Indoor" />
                  <Picker.Item label="Outdoor" value="Outdoor" />
                  <Picker.Item label="Online" value="Online" />
                </Picker>
              </View>
            </View>
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownLabel}>Event Category</Text>
              <View style={{borderWidth: 1}}>
                <Picker
                  style={{borderWidth: 1, borderRadius: 5, borderColor: '#000'}}
                  selectedValue={eventCategory}
                  onValueChange={(itemValue, itemIndex) => {
                    console.log('hereee', itemValue),
                      setEventCategory(itemValue);
                  }}>
                  {pickerItems}
                </Picker>
              </View>
            </View>

            {/* RSVP */}
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownLabel}>Event RSVP</Text>
              <View style={{borderWidth: 1}}>
                <Picker
                  style={{borderWidth: 1, borderRadius: 5, borderColor: '#000'}}
                  selectedValue={eventRsvp}
                  onValueChange={(itemValue, itemIndex) =>
                    setEventRsvp(itemValue)
                  }>
                  <Picker.Item label="Select" value="" />

                  <Picker.Item label="Yes" value={1} />
                  <Picker.Item label="No" value={0} />
                </Picker>
              </View>
            </View>
            {/* RSVP */}

            {/* Price */}
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownLabel}>Event Free</Text>
              <View style={{borderWidth: 1}}>
                <Picker
                  style={{borderWidth: 1, borderRadius: 5, borderColor: '#000'}}
                  selectedValue={eventFree}
                  onValueChange={(itemValue, itemIndex) =>
                    setEventFree(itemValue)
                  }>
                  <Picker.Item label="Select" value="" />

                  <Picker.Item label="Yes" value={1} />
                  <Picker.Item label="No" value={0} />
                </Picker>
              </View>
            </View>
            {/* Price */}
            {eventFree === 0 && (
              <FloatingLabelTextInput
                title="Event Price"
                keyboardType={'numeric'}
                onChangeText={text => setEventPrice(text)}
              />
            )}

            <FloatingLabelTextInput
              title="Event Slots"
              secureTextEntry={false}
              onChangeText={text => setEventSlot(text)}
            />

            {/* START DATE  */}
            <View
              style={[
                styles.dropdownContainer,
                {flexDirection: 'row', alignItems: 'center'},
              ]}
              onTouchEnd={() => setShowPicker(true)}>
              <FontAwesome5Icon
                name="calendar"
                size={24}
                color={colors.primary}
                light
                onPress={() => setShowPicker(true)}
              />
              <View style={{marginLeft: 10}}>
                <Text style={[styles.dropdownLabel, {color: '#888'}]}>
                  Event Start Date
                </Text>
                <Text style={{fontSize: 24, color: '#000'}}>
                  {moment(startDate).format('LLL')}
                </Text>
              </View>
              {showPicker && (
                <DateTimePicker
                  value={startDate}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>

            {/* START DATE  */}

            {/* START TIME  */}
            <View
              style={[
                styles.dropdownContainer,
                {flexDirection: 'row', alignItems: 'center'},
              ]}
              onTouchEnd={() => setShowPicker2(true)}>
              <FontAwesome5Icon
                name="clock"
                size={24}
                color={colors.primary}
                light
                onPress={() => setShowPicker2(true)}
              />
              <View style={{marginLeft: 10}}>
                <Text style={[styles.dropdownLabel, {color: '#888'}]}>
                  Event Start Time
                </Text>
                <Text style={{fontSize: 24, color: '#000'}}>
                  {moment(startTime).format('LT')}
                </Text>
              </View>

              {showPicker2 && (
                <DateTimePicker
                  value={startTime}
                  mode="time"
                  display="default"
                  onChange={onChange2}
                />
              )}
            </View>
            {/* START TIME  */}

            {/* START DATE 2 */}
            <View
              style={[
                styles.dropdownContainer,
                {flexDirection: 'row', alignItems: 'center'},
              ]}
              onTouchEnd={() => setShowPicker3(true)}>
              <FontAwesome5Icon
                name="calendar"
                size={24}
                color={colors.primary}
                light
                onPress={() => setShowPicker3(true)}
              />
              <View style={{marginLeft: 10}}>
                <Text style={[styles.dropdownLabel, {color: '#888'}]}>
                  Event End Date
                </Text>
                <Text style={{fontSize: 24, color: '#000'}}>
                  {moment(endDate).format('LLL')}
                </Text>
              </View>
              {showPicker3 && (
                <DateTimePicker
                  value={endDate}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onChange3}
                />
              )}
            </View>

            {/* START DATE 2 */}

            {/* START TIME 2 */}
            <View
              style={[
                styles.dropdownContainer,
                {flexDirection: 'row', alignItems: 'center'},
              ]}
              onTouchEnd={() => setShowPicker4(true)}>
              <FontAwesome5Icon
                name="clock"
                size={24}
                color={colors.primary}
                light
                onPress={() => setShowPicker4(true)}
              />
              <View style={{marginLeft: 10}}>
                <Text style={[styles.dropdownLabel, {color: '#888'}]}>
                  Event End Time
                </Text>
                <Text style={{fontSize: 24, color: '#000'}}>
                  {moment(endTime).format('LT')}
                </Text>
              </View>

              {showPicker4 && (
                <DateTimePicker
                  value={endTime}
                  mode="time"
                  display="default"
                  onChange={onChange4}
                />
              )}
            </View>
            {/* START TIME 2 */}

            {/* Image */}
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownLabel}>Event Image</Text>
              {!eventImage ? (
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
                    source={{uri: eventImage.uri}}
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
              title="Event Description"
              secureTextEntry={false}
              multiline={true}
              numberOfLines={6}
              onChangeText={text => setEventDescription(text)}
            />

            {/* Login using Email */}

            <Button
              title="Create Event"
              style={[styles.loginButton, styles.loginButtonText]}
              onPress={() => createEventtt()}
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

export default CreateEvent;
