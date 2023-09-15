//import liraries
import { useNavigation } from '@react-navigation/native';
import React, {Component} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import { myEvents, savedEvents } from '../../actions/profileAction';
import ListingCard from '../../Components/ListingCard';
import ListingCard2 from '../../Components/ListingCard2';
import colors from '../../constants/colors';





// create a component
let active = 'My Events';
const MyEvents = () => {
    const [loader, setLoader] = React.useState(false);

    const navigation = useNavigation();



    const [myEventData, setMyEventData] = React.useState([]);
    const [savedEventdata, setSavedEventdata] = React.useState([]);
  
    React.useEffect(() => {
      loadAll();
    }, [])
  
  
    const loadAll = async () => {
      let loadMyEventsRes = await myEvents();
      setMyEventData(loadMyEventsRes.data);
      let loadSavedEventsRes = await savedEvents();
      setSavedEventdata(loadSavedEventsRes.data);
      console.log("saved events", loadSavedEventsRes);
    }









  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',

          marginVertical: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Pressable
          onPress={() => {
            (active = 'My Events'),
              setLoader(true),
              setTimeout(() => {
                setLoader(false);
              }, 2000);
          }}>
          <TouchableOpacity
            style={{
              marginRight: 5,
              borderRadius: 5,
              borderWidth: active != 'My Events' ? 1 : 0,
              backgroundColor:
                active === 'My Events' ? colors.secondary : '#fff',
              paddingHorizontal: active != 'My Events' ? 11 : 12,
              paddingVertical: active != 'My Events' ? 5 : 6,
            }}>
            <Text style={{color: active === 'My Events' ? '#fff' : '#000'}}>
              My Events
            </Text>
          </TouchableOpacity>
        </Pressable>
        <Pressable
          onPress={() => {
            (active = 'Saved'),
              setLoader(true),
              setTimeout(() => {
                setLoader(false);
              }, 2000);
          }}>
          <TouchableOpacity
            style={{
              marginRight: 5,
              borderRadius: 5,
              borderWidth: active != 'Saved' ? 1 : 0,
              backgroundColor: active === 'Saved' ? colors.secondary : '#fff',
              paddingHorizontal: active != 'Saved' ? 11 : 12,
              paddingVertical: active != 'Saved' ? 5 : 6,
            }}>
            <Text style={{color: active === 'Saved' ? '#fff' : '#000'}}>
              Saved
            </Text>
          </TouchableOpacity>
        </Pressable>
      </View>


<View style={{flex:1, height:"100%"}}>
{!loader ? ( 
    <View>
      {/* My Groups */}
      {active === "My Events" && ( 

        <View style={styles.cardContainer}>
        
        <ScrollView
          horizontal={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scroll}>
           {myEventData.length > 0 ? (
            <>
          {myEventData.slice(0, 10).map((card, index) => (
            <Pressable
              onPress={() =>
                navigation.navigate('EventDetail', {
                  eventId: card.id,
                  eventTitle: card.event_name,
                })
              }>
              <ListingCard2    key={index}
                        image={card.event_image}
                        name={card.event_name}
                        seats={card.event_seats}
                        location={card.event_location} />
            </Pressable>
          ))}
          </>
          ):(
            <View style={{flex: 1, alignItems: 'center', justifyContent:"center"}}>
                <Text>No events found.</Text>
            </View>
          )}
        </ScrollView>

      </View>
      )}

      {/* My Events */}
      {/* My Events */}
      {active === "Saved" && ( 

        <View style={styles.cardContainer}>

        <ScrollView
          horizontal={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scroll}>
          {savedEventdata.length>0 ? (
            <>
            {savedEventdata.slice(0, 10).map((card, index) => (
            <Pressable
              onPress={() =>
                navigation.navigate('EventDetail', {
                  eventId: card.id,
                  eventTitle: card.event_name,
                })
              }>
              <ListingCard2    key={index}
                        image={card.event_image}
                        name={card.event_name}
                        seats={card.event_seats}
                        location={card.event_location} />
            </Pressable>
          ))}
          </>
          ):(
            <View style={{flex: 1, alignItems: 'center', justifyContent:"center"}}>
                <Text>No events found.</Text>
            </View>
          )}
         
        </ScrollView>

      </View>
      )}

      {/* My Events */}
      </View>
      ):(
        <View style={{flex: 1, alignItems: 'center', marginTop: '60%'}}>
            <ActivityIndicator   size="large" color={colors.secondary} />
          </View>
      )}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
  cardContainer: {
    flex:1,
    height:"100%"
    // marginHorizontal: 10,
  },
  scroll: {
    // flexDirection: 'row',
    alignItems: 'center',
  },
});

//make this component available to the app
export default MyEvents;
