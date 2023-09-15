//import liraries
import { useNavigation } from '@react-navigation/native';
import React, {Component} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import { myGroups, savedGroups } from '../../actions/profileAction';
import ListingCard from '../../Components/ListingCard';
import colors from '../../constants/colors';




let active = 'My Groups';
const MyGroups = () => {
    const [loader, setLoader] = React.useState(false);

    const navigation = useNavigation();

    const [myGroupData, setMyGroupdata] = React.useState([]);
    const [savedGroupData, setSavedGroupdata] = React.useState([]);
  
    React.useEffect(() => {
      loadAll();
    }, [])
  
    const loadAll = async () => {
      setLoader(true)
      let loadMyGroupsRes = await myGroups();
      console.log("my", loadMyGroupsRes)
      setMyGroupdata(loadMyGroupsRes.data.data);
      let loadSavedGroupsRes = await savedGroups();
      console.log("saved", loadSavedGroupsRes)
      setSavedGroupdata(loadSavedGroupsRes.data.data);  
      setTimeout(()=> {
        setLoader(false)
      },2000)
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
            (active = 'My Groups'),
              setLoader(true),
              setTimeout(() => {
                setLoader(false);
              }, 2000);
          }}>
          <TouchableOpacity
            style={{
              marginRight: 5,
              borderRadius: 5,
              borderWidth: active != 'My Groups' ? 1 : 0,
              backgroundColor:
                active === 'My Groups' ? colors.secondary : '#fff',
              paddingHorizontal: active != 'My Groups' ? 11 : 12,
              paddingVertical: active != 'My Groups' ? 5 : 6,
            }}>
            <Text style={{color: active === 'My Groups' ? '#fff' : '#000'}}>
              My Groups
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
      {active === "My Groups" && ( 

        <View style={styles.cardContainer}>
        
        <ScrollView
          horizontal={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scroll}>
           {savedGroupData.length>0 ? (
            <>
          {myGroupData.slice(0, 10).map((card, index) => (
            <Pressable
              onPress={() =>
                navigation.navigate('GroupDetail', {
                  groupId: card.id,
                  groupTitle: card.group_name,
                })
              }>
              <ListingCard  key={index}
                image={card.group_image}
                name={card.group_name}
                members={card.members_count}
                comments={card.comments_count}
                location={card.group_location} />
            </Pressable>
          ))}
          </>
          ):(
            <View style={{flex: 1, alignItems: 'center', justifyContent:"center"}}>
                <Text>No groups found.</Text>
            </View>
          )}
        </ScrollView>

      </View>
      )}

      {/* My Groups */}
      {/* My Groups */}
      {active === "Saved" && ( 

        <View style={styles.cardContainer}>

        <ScrollView
          horizontal={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scroll}>
          {savedGroupData.length>0 ? (
            <>
            {savedGroupData.slice(0, 10).map((card, index) => (
            <Pressable
              onPress={() =>
                navigation.navigate('GroupDetail', {
                  groupId: card.id,
                  groupTitle: card.group_name,
                })
              }>
              <ListingCard  key={index}
                image={card.group_image}
                name={card.group_name}
                members={card.members_count}
                comments={card.comments_count}
                location={card.group_location} />
            </Pressable>
          ))}
          </>
          ):(
            <View style={{flex: 1, alignItems: 'center', justifyContent:"center"}}>
                <Text>No groups found.</Text>
            </View>
          )}
         
        </ScrollView>

      </View>
      )}

      {/* My Groups */}
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
export default MyGroups;
