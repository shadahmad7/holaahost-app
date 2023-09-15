//import liraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import React, {useState, Component} from 'react';
import {
  View,
  Share,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ImageBackground,
  Alert,
  Button,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {
  getAllAttendees,
  getAllRequestedAttendees,
} from '../../actions/attendeesAction';
import {eventById, getAllUpcomingEvents} from '../../actions/eventAction';
import OverviewCard2 from '../../Components/OverviewCard2';
import {api} from '../../config/api';
import colors from '../../constants/colors';

let active = 'Info';
let optiions = ['Info', 'Attendees'];

let start, end;

let user;
const EventDetail = props => {
  const [id, setId] = React.useState(0);
  const [eventDetail, setEventDetail] = React.useState({});
  const [saved, setSaved] = React.useState(false);
  const [loader, setLoader] = React.useState(false);

  const [upcomingData, setUpcomingData] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [admin, setAdmin] = useState(false);

  const [data, setData] = React.useState([]);
  const [reqData, setReqData] = React.useState([]);

  React.useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoader(true);
    console.log('hereeeee', props.route.params.eventId);
    setId(props.route.params.eventId);

    let getEventDetailRes = await eventById(props.route.params.eventId);
    console.log(':kkk', getEventDetailRes);
    setEventDetail(getEventDetailRes.data);

    if (getEventDetailRes?.data?.is_saved) {
      setSaved(true);
    }

    start = eventDetail?.event_start_time;
    end = eventDetail?.event_end_time;

    let upcomingRes = await getAllUpcomingEvents(
      eventDetail?.id,
      eventDetail?.event_category_id,
    );
    console.log('heeereeee', upcomingRes);
    setUpcomingData(upcomingRes.data);

    loadAllAttendees(props.route.params.eventId);

    let b = await AsyncStorage.getItem('@user');
    if (b) {
      b = JSON.parse(b);
      user = b.id;
    }

    if (getEventDetailRes?.data?.event_user_id == user) {
      setAdmin(true);
    }

    setTimeout(() => {
      setLoader(false);
    }, 2000);
  };

  const loadAllAttendees = async id => {
    let action = await getAllAttendees(id);
    setAttendees(action.data.data);
    let action2 = await getAllRequestedAttendees(id);
    setReqData(action2?.data?.data);
    console.log('all attendeess', action?.data?.data);
    console.log('request attendeess', action2?.data?.data);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
        url: 'https://holaahost.web.app',
        title: 'Hello',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: api.imageUrl + eventDetail?.event_image,
        }}
        style={{
          width: '100%',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          height: 150,
        }}
      />

      {/* Card */}
      <View
        style={{
          width: '80%',
          height: 160,
          paddingHorizontal: 20,
          borderRadius: 10,
          paddingVertical: 10,
          marginTop: -90,
          backgroundColor: '#fff',
        }}>
        <Text style={{fontSize: 24, fontWeight: '700', marginVertical: 2}}>
          {eventDetail?.event_name}
        </Text>
        <Text style={{fontSize: 14, fontWeight: '500', marginVertical: 2}}>
          Hosted by {eventDetail?.host}
        </Text>
        <Text style={{fontSize: 14, fontWeight: '500', marginVertical: 2}}>
          {eventDetail?.location}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
            justifyContent: 'flex-end',
          }}>
          {/* <TouchableOpacity
            style={{
              paddingHorizontal: 10,
              borderRadius: 5,
              backgroundColor: colors.primary,
              paddingVertical: 10,
            }}>
            <Text style={{color: '#fff'}}>Join Group</Text>
          </TouchableOpacity> */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <FontAwesome5Icon
              name="bookmark"
              color="#444"
              size={18}
              solid={saved}
              light={!saved}
              style={{marginRight: 10}}
              onPress={() => setSaved(!saved)}
            />
            <TouchableOpacity
              onPress={() => onShare()}
              style={{
                paddingHorizontal: 6,
                borderRadius: 5,
                backgroundColor: colors.secondary,
                paddingVertical: 6,
              }}>
              <Text
                onPress={() => onShare()}
                style={{color: '#fff', fontSize: 12}}>
                Share
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Card */}

      <View>
        {/* Main Oprions */}

        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {optiions.map((opt, index) => (
            <Pressable
              onPress={() => {
                (active = opt),
                  setLoader(true),
                  console.log('admkld', active),
                  setTimeout(() => {
                    setLoader(false);
                  }, 2000);
              }}>
              <TouchableOpacity
                key={index}
                style={{
                  marginRight: 5,
                  borderRadius: 5,
                  borderWidth: active != opt ? 1 : 0,
                  backgroundColor: active === opt ? colors.secondary : '#fff',
                  paddingHorizontal: active != opt ? 11 : 12,
                  paddingVertical: active != opt ? 5 : 6,
                }}>
                <Text style={{color: active === opt ? '#fff' : '#000'}}>
                  {opt}
                </Text>
              </TouchableOpacity>
            </Pressable>
          ))}
        </View>
      </View>
      {/* Main Oprions */}

      {/* Main Contetn */}
      <View style={{marginTop: 10, height: '100%', flex: 1, width: '100%'}}>
        {!loader ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            {active === 'Info' && (
              <View
                style={{
                  marginTop: 10,

                  marginHorizontal: 20,
                  paddingHorizontal: 20,
                  width: '100%',
                }}>
                <Text style={styles2.eventHeader}>What We're About</Text>
                <Text>{eventDetail?.event_description}</Text>
                <View style={styles2.eventCard}>
                  <View style={styles2.eventContent}>
                    <Text style={styles2.eventDate}>
                      Start Time & Date:{' '}
                      {moment(eventDetail?.event_start_time).format(
                        'dddd, MMM DD YYYY h:mm A',
                      )}
                    </Text>
                    <View>
                      <Text>.</Text>
                      <Text>.</Text>
                      <Text>.</Text>
                      <Text>.</Text>
                    </View>
                    <Text style={styles2.eventDate}>
                      End Time & Date:{' '}
                      {moment(eventDetail?.event_end_time).format(
                        'dddd, MMM DD YYYY h:mm A',
                      )}
                    </Text>
                  </View>
                </View>
                <View style={{marginVertical: 10}}>
                  <Text style={styles2.eventHeader}>Venue:</Text>
                  <Text>{eventDetail?.event_address}</Text>
                </View>
                <View style={{marginVertical: 10}}>
                  <Text style={styles2.eventHeader}>
                    {eventDetail?.event_free === 1
                      ? `FREE`
                      : eventDetail?.event_price}
                  </Text>
                  <Text>{eventDetail?.left_seat} Spots Left</Text>
                </View>

                <TouchableOpacity style={styles.button}>
                  <Text style={{color: '#fff', fontSize: 14}}>Claim</Text>
                </TouchableOpacity>
              </View>
            )}
            {/* Info */}

            {active === 'Attendees' && (
              <View
                style={{
                  marginTop: 10,
                  width: '90%',
                  alignSelf: 'center',
                  marginHorizontal: 20,
                }}>
                <Text
                  style={{
                    color: '#000',
                    marginLeft: 30,
                    textAlign: 'left',
                    marginVertical: 10,
                    fontWeight: '500',
                    fontSize: 20,
                  }}>
                  Requested Attendees
                </Text>
                {/* <>
                  {reqData.length === 0 && (
                    <View style={{alignSelf: 'center', margin: 10}}>
                      <Text>No request found</Text>
                    </View>
                  )}

                  {reqData.length > 0 && (
                    <View>
                      {reqData.map((req, index) => (
                        <View
                          key={index}
                          style={{
                            justifyContent: 'space-between',
                            alignItems: 10,
                            padding: 10,
                            flexDirection: 'row',
                          }}>
                          <Text>{req.name}</Text>
                          <View
                            style={{
                              justifyContent: 'space-between',
                              alignItems: 10,

                              flexDirection: 'row',
                            }}>
                            <TouchableOpacity
                              style={{
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                borderRadius: 5,
                                backgroundColor: 'green',
                              }}>
                              <Text>Accept</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                borderRadius: 5,
                                marginLeft: 5,
                                backgroundColor: 'red',
                              }}>
                              <Text>Reject</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      ))}
                    </View>
                  )}
                </> */}

                <Text
                  style={{
                    color: '#000',
                    marginLeft: 30,
                    textAlign: 'left',
                    marginVertical: 10,
                    fontWeight: '500',
                    fontSize: 20,
                  }}>
                  All Attendees
                </Text>

                <>
                  {attendees.length === 0 && (
                    <View style={{alignSelf: 'center', margin: 10}}>
                      <Text>No attendees found</Text>
                    </View>
                  )}

                  {attendees.length > 0 && (
                    <View style={{height: '100%', marginHorizontal: 10}}>
                      <View style={{marginVertical: 20, padding: 10}}>
                        <ScrollView
                          showsVerticalScrollIndicator={false}
                          showsHorizontalScrollIndicator={false}
                          contentContainerStyle={{flexGrow: 1}}>
                          {attendees.map(attendee => (
                            <View
                              style={styles2.attendeeCard}
                              key={attendee.id}>
                              <Image
                                style={styles2.attendeePic}
                                source={{uri: attendee.pic}}
                              />
                              <Text style={styles2.attendeeName}>
                                {attendee.name}
                              </Text>
                            </View>
                          ))}
                        </ScrollView>
                      </View>
                    </View>
                  )}
                </>
              </View>
            )}

            <View
              style={{
                marginTop: 10,
                width: '90%',
                alignSelf: 'center',
                marginHorizontal: 20,
              }}>
              <Text
                style={{
                  color: '#000',
                  marginLeft: 20,
                  textAlign: 'left',
                  marginVertical: 10,
                  fontWeight: '500',
                  fontSize: 20,
                }}>
                Upcoming events
              </Text>
            </View>

            {upcomingData.length === 0 && (
              <View style={{margin: 20, alignSelf: 'center'}}>
                <Text>No upcoming events found</Text>
              </View>
            )}

            <View style={{marginHorizontal: 20}}>
              <ScrollView
                horizontal={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scroll}>
                {upcomingData.slice(0, 3).map((card, index) => (
                  <OverviewCard2
                    key={index}
                    image={card.image}
                    name={card.name}
                  />
                ))}
              </ScrollView>
            </View>
          </ScrollView>
        ) : (
          <View style={{flex: 1, alignItems: 'center', marginTop: '30%'}}>
            <ActivityIndicator size="large" color={colors.secondary} />
          </View>
        )}

        {/* Main Contetn */}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
  scroll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 15,
    alignSelf: 'flex-end',
    marginRight: 30,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    margin: 5,
    width: 90,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
});

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  attendeeCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    // borderWidth:0.3,
    width: '100%',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 16,
  },
  attendeePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  attendeeName: {
    fontSize: 18,
  },

  eventCard: {
    width: '90%',
    borderWidth: 0.3,
    borderRadius: 10,
    padding: 16,
    marginTop: 16,
  },
  eventHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  eventContent: {
    alignItems: 'center',
  },
  eventDate: {
    fontSize: 16,
    marginTop: 8,
  },
});

export default EventDetail;
