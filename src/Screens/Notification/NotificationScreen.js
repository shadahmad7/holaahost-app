import React from 'react';
import {Text,StyleSheet, View} from 'react-native';
import BlankPage from '../../Components/BlankPage';
import GuestPage from '../../Components/GuestPage';
import imagePath from '../../constants/imagePath';
import NotificationCard from '../../Components/NotificationCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NotificationScreen() {
  const [logged, setLogged] = React.useState(false);
  const [empty, setEmpty] = React.useState(true);

  React.useEffect(()=> {
    loadData();
  },[])


const loadData = async()=> {
  let userr = await AsyncStorage.getItem('@user');
  console.log("hereeee", userr)
  if(userr){
    setLogged(true)
  }else {
    setLogged(false)
  }
}


  return (
    <>
      {!logged ? (
        <GuestPage
          title="Stay in the loop and don't miss out"
          subTitle="Be the first to hear about new events and groups near you."
          image={imagePath.notificationIcon}
        />
      ) : (
        <>
          {!empty ? (
            <BlankPage
              title="Nothing yet, but stay tuned"
              subTitle="You'll get group updates, event reminders, and new recommendation here."
              image={imagePath.notificationIcon}
            />
          ) : (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
              <Text style={styles.headingText}>This Week</Text>
              <NotificationCard image="https://www.influenceim.com/wp-content/uploads/2017/07/event-planningand-management-1024x683.jpg" />
            </View>
          )}
        </>
      )}
    </>
  );
}


const styles = StyleSheet.create({
  headingText:{
    fontSize:14,
    marginTop:20,
    marginLeft:10,
    fontWeight:"bold"
  }
});