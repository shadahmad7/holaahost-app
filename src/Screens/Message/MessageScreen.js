import React, { useState } from 'react';
import {Text, StyleSheet, View, Image, Pressable, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native';
import GuestPage from '../../Components/GuestPage';
import BlankPage from '../../Components/BlankPage';
import imagePath from '../../constants/imagePath';
import colors from '../../constants/colors';
import {useNavigation} from '@react-navigation/core';
import { ScrollView } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';



let userInfo;

export default function MessageScreen() {
  const navigation = useNavigation();
  const [loader, setLoader] = React.useState(true);
  const [logged, setLogged] = React.useState(false);
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");


  const [err, setErr] = useState(false);

  const [user, setUser] = useState({});


  React.useEffect(()=> {
    setUser(null)
    loadData();
  },[])


const loadData = async()=> {
setLoader(true);

  let userr = await AsyncStorage.getItem('@user');
  console.log("hereeee", userr)

  if(userr){
    setLogged(true)
  }
  else {
    setLogged(false)
  }


  let b = await AsyncStorage.getItem("@chatUser");
  if (b) {
    console.log("userrr   r", b);
    setSearch(b);
    handleSearch();
  }


  let userData = await AsyncStorage.getItem('@firebaseUser');
  if(userData){

    userData = JSON.parse(userData);
    console.log('bbbbbbbbbbbb', userData.user.uid);
    userInfo = userData.user;
    let uid = userData.user.uid;
   const unsub =  firestore().doc(`userChats/${uid}`)
    .onSnapshot(doc => {
      console.log('AAAAAAA', doc);
      console.log('Chatsss', doc.data());
      setChats(doc.data());
    });
  }

  setTimeout(()=> {
    setLoader(false)

  },2000)


  return () => {
    unsub();
  };

}


const handleSearch = async () => {
  console.log("SEARCHEDDD", search)
  firestore()
  .collection('users')
  .where('displayName', '==', search)
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(doc => {
      console.log("newwww", doc.data())
      setUser(doc.data());
    });
  })
  .catch(error => {
    setErr(true);
    console.error('Error getting documents: ', error);
  });


  // console.log("hereee search", user)
};





const handleSelect = async () => {

  const combinedId =
  userInfo.uid > user.uid
    ? userInfo.uid + user.uid
    : user.uid + userInfo.uid;
try {
  const res = await firestore().collection("chats").doc(combinedId).get();
  console.log("res",res)

  if (!res.exists) {
    //create a chat in chats collection
     let a=  await firestore().collection("chats").doc(combinedId).set({ messages: [] });
console.log("a",a)
    //create user chats
    let b = await firestore().collection("userChats").doc(userInfo.uid).update({
      [combinedId + ".userInfo"]: {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
      [combinedId + ".date"]: firestore.FieldValue.serverTimestamp(),
    });


    console.log("b",b)


     await firestore().collection("userChats").doc(user.uid).update({
      [combinedId + ".userInfo"]: {
        uid: userInfo.uid,
        displayName: userInfo.displayName,
        photoURL: userInfo.photoURL,
      },
      [combinedId + ".date"]: firestore.FieldValue.serverTimestamp(),
    });
  }
} catch (err) {}

setUser(null);
setSearch("");
// await AsyncStorage.removeItem("@chatUser");
loadData();
};








  return (

    <>
    {!loader ? (
      <>
      {!logged ? (
        <GuestPage
          title="Connect with other members"
          subTitle="Stay in touch with the members and organizers you meet."
          image={imagePath.messageIcon}
        />
      ) : (
        <>
          {chats?.length === 0 ? (
            <BlankPage
              title="No messages at the moment"
              subTitle="Start the conversation with the people you meet and keep track of them here."
              image={imagePath.messageIcon}
            />
          ) : (
            <>
            <View style={{flex: 1}}>
<View>
  <TextInput 
  style={{borderRadius:10, borderWidth:1, paddingHorizontal:10, marginHorizontal:20, paddingVertical:10, marginVertical:20}}
    onSubmitEditing={handleSearch}
          onChangeText={(text) => setSearch(text)}  
           placeholder='Search users and click to add'  />
</View>

{err && <Text style={{fontSize:12,textAlign:"center", marginVertical:10, fontWeight:"600"}}>User not found!</Text>}

{user && (
  <View style={{padding:10, flexDirection:"row",marginHorizontal:20, borderWidth:0.4,borderRadius:10, justifyContent:"space-between",alignItems:"center"}} >
  <View style={{flexDirection:"row", justifyContent:"flex-start",alignItems:"center"}}>
  <Image source={{uri:user.photoURL }} style={{width:60, height:60, borderRadius:40}} />
    <View style={{marginLeft:20}}>
      <Text>{user.displayName}</Text>
    </View>
  </View>
    
    <TouchableOpacity style={{paddingHorizontal:15,borderRadius:4,justifyContent:"flex-end", borderWidth:0.3, paddingVertical:5}} 
    onPress={handleSelect}
    >
      <Text style={{fontSize:12}}>Add</Text>
    </TouchableOpacity>
  </View>
)}

            <ScrollView>
            {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
              <Pressable onPress={()=> navigation.navigate("ChatScreen", {
                 chatId:
            userInfo.uid > chat[1]?.userInfo.uid
              ? userInfo.uid + chat[1]?.userInfo.uid
              : chat[1]?.userInfo.uid + userInfo.uid,
              chatUserUid:chat[1]?.userInfo.uid,
              userName: chat[1]?.userInfo.displayName,
              photoUrl:chat[1]?.userInfo.photoURL
              })}>

                <View
                key={chat[0]}
                 style={{paddingHorizontal:10, 
                 flexDirection:"row", justifyContent:"space-between", 
                paddingVertical:10, marginHorizontal:1,
                borderBottomWidth:0.2, marginVertical:1, 
                backgroundColor: chat[1]?.userInfo?.displayName === userInfo?.displayName ? "#e09504":""}}>

<View style={{flexDirection:'row', alignItems:'center'}}>
<Image source={{uri:chat[1]?.userInfo.photoURL}} style={{width:70, height:70, borderRadius:70}} />
                <View style={{marginLeft:20}}>
                  <Text style={{fontSize:20, fontWeight:"600"}}>{chat[1]?.userInfo.displayName}</Text>
                  <Text style={{fontSize:13, fontWeight:"300"}}>{chat[1]?.lastMessage?.text}</Text>
                </View>
</View>
               
                  
                </View>
              </Pressable>
              ))}
            </ScrollView>
            
            </View>
            </>
           
          )}
        </>
      )}
    </>
    ):(
      <View style={{flex: 1, alignItems: 'center', marginTop: '60%'}}>
            <ActivityIndicator   size="large" color={colors.secondary} />
          </View>
    )}

    
 
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',

    margin: 16,
    backgroundColor: colors.primary,
    right: 0,
    bottom: 0,
  },
});
