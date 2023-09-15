import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Modal,
  Image,
  Button,
  ActivityIndicator,
  Pressable,
  Alert,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import colors from '../../constants/colors';
import imagePath from '../../constants/imagePath';

import firestore, {firebase} from '@react-native-firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment/moment';
import {launchImageLibrary} from 'react-native-image-picker';
import 'react-native-get-random-values';

import {v4 as uuidv4} from 'uuid';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import storage from '@react-native-firebase/storage';

const db = firestore();
const store = storage();

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

let userInfo;
let chatInfo;
let isUserBlocked = false;

export default function ChatScreen(props) {
  const navigation = useNavigation();
  const [logged, setLogged] = React.useState(true);
  const [loader, setLoader] = React.useState(true);
  const [msg, setMsg] = useState('');
  
  const [parent , setParent] = React.useState(false);
  const [blockmsg, setBlockMsg] = useState('');
  
  // const [img, setImg] = useState(null);
  const [messages, setMessages] = useState([]);


  const scrollViewRef = useRef();

  const handleLayout = () => {
    scrollViewRef.current.scrollToEnd();
  };

  React.useEffect(() => {
    loadData();
    checkBlock();
    console.log("HHHHHHH", parent)
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => onPressIcon1()}>
            <Icon
              name="trash"
              size={24}
              color="#000"
              style={{marginRight: 20}}
              onPress={() => onPressIcon1()}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => checkParent()}>
            <Icon
              name="user-x"
              size={24}
              color="#000"
              onPress={() => checkParent()}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);





  const checkParent = async()=> {
    console.log("jjjjj", isUserBlocked);
    if(!isUserBlocked){
      console.log("hereee false")
      onPressIcon2();
    } else {
      console.log("hereee true")
      onPressIcon3();
    }
  }







  const checkBlock = async () => {
let status;
    let userData = await AsyncStorage.getItem('@firebaseUser');
    userData = JSON.parse(userData);
    console.log('bbbbbbbbbbbb', userData.user.uid);
 let myFirebaseUser = userData.user;

  
    const combinedId = 
      myFirebaseUser.uid > chatInfo.chatUserUid
    ? myFirebaseUser.uid + chatInfo.chatUserUid
    : chatInfo.chatUserUid + myFirebaseUser.uid;
    console.log('bbbbbbbbbbbb', combinedId);

    const docRef = firestore().doc(`blockedUsers/${chatInfo.chatId}`);

console.log("co,mccc", combinedId)

    try {
      const docSnap = await docRef.get();
      let d = docSnap.data();
      console.log("DOCXXXXXXXXXX", d);
      isUserBlocked = false;
      if (d != undefined) {
        console.log("kkkk", d[`${combinedId}`].blockInfo);
        d = d[`${combinedId}`].blockInfo;
        if(d.parentId === myFirebaseUser.uid) {
          setParent(true);
          setBlockMsg("You have blocked this chat");
          console.log("You have blocked this chat")
          isUserBlocked = true;
          console.log("msg 1", msg);
        } else {
          setParent(false);
          console.log("You have been blocked by this chat")
          setBlockMsg("You have been blocked by this chat");
          isUserBlocked = false;

          console.log("msg 2", msg);
        }
        console.log("block", docSnap.data());
      } else {
        setBlockMsg("");
      }
    } catch (error) {
      console.log("err", error);
    }
  
    console.log("last msg", blockmsg);
    console.log("Parenttttt", parent);
  };











  const onPressIcon1 = async () => {
    Alert.alert(
      'Clear Chat',
      'Do you want to clear chat?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed 1'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => deleteChat()},
      ],
      {cancelable: false},
    );
  };


  const onPressIcon2 = async () => {
    Alert.alert(
      'Block',
      'Do you want to block chat?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed 2'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => blockChat()},
      ],
      {cancelable: false},
    );
  };


  const onPressIcon3 = async () => {
    Alert.alert(
      'Unblock',
      'Do you want to unblock chat?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed 2'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => unblockChat()},
      ],
      {cancelable: false},
    );
  };


  const deleteChat = async () => {
    try {
      const docRef = firestore().doc(`chats/${chatInfo?.chatId}`);
      const opt = {
        messages: firestore.FieldValue.delete(),
      };
      await docRef.update(opt);
      console.log("Chat History has been deleted successfully");
      navigation.navigate("MessageScreen");
    } catch (error) {
      console.log(error);
    }
  };



  const blockChat = async () => {
    let userData = await AsyncStorage.getItem('@firebaseUser');
    userData = JSON.parse(userData);
    console.log('COMBINEIDDD', userData.user.uid);
 let myFirebaseUser = userData.user;

  
    const combinedId = 
      myFirebaseUser.uid > chatInfo.chatUserUid
    ? myFirebaseUser.uid + chatInfo.chatUserUid
    : chatInfo.chatUserUid + myFirebaseUser.uid;
    console.log('COMBINEIDDD', combinedId);



    try {
      const res = await firestore().doc(`blockedUsers/${myFirebaseUser.uid}`).get();
      console.log("RESSSS", res.exists);
      if (res.exists) {
        await firestore().doc(`blockedUsers/${combinedId}`).update({
          [`${combinedId}.blockInfo`]: {
            parentId: myFirebaseUser.uid,
            childId: chatInfo.chatUserUid,
          },
          [`${combinedId}.date`]: firestore.FieldValue.serverTimestamp(),
        });
      } else {
        await firestore().doc(`blockedUsers/${combinedId}`).set({});
        await firestore().doc(`blockedUsers/${combinedId}`).update({
          [`${combinedId}.blockInfo`]: {
            parentId: myFirebaseUser.uid,
            childId: chatInfo.chatUserUid,
          },
          [`${combinedId}.date`]: firestore.FieldValue.serverTimestamp(),
        });
      }
    } catch (err) {}

    checkBlock();
  };




  const unblockChat = async () => {
    let userData = await AsyncStorage.getItem('@firebaseUser');
    userData = JSON.parse(userData);
    console.log('COMBINEIDDD', userData.user.uid);
 let myFirebaseUser = userData.user;

    const combinedId = 
      myFirebaseUser.uid > chatInfo.chatUserUid
    ? myFirebaseUser.uid + chatInfo.chatUserUid
    : chatInfo.chatUserUid + myFirebaseUser.uid;
    console.log('COMBINEIDDD', combinedId);

 try {
  const docRef = firestore().doc(`blockedUsers/${combinedId}`);
  const docSnap = await docRef.get();
  console.log("RESSSS", docSnap.exists);
  if (docSnap.exists) {
    await docRef.delete();
    console.log("Entire Document has been deleted successfully.");
  }
} catch (err) {
  console.log(err);
}
  checkBlock();  
  };





  

  const loadData = async () => {
    setLoader(true);
    console.log('hereeeee', props.route.params);
    chatInfo = props.route.params;

    let userData = await AsyncStorage.getItem('@firebaseUser');
    userData = JSON.parse(userData);
    console.log('bbbbbbbbbbbb', userData.user);
    userInfo = userData.user;

    console.log('messsageee data', chatInfo.photoUrl);

    const unSub = firestore()
      .collection('chats')
      .doc(chatInfo.chatId)
      .onSnapshot(doc => {
        console.log('messsageee data', doc.data());
        if (doc.data().hasOwnProperty('messages')) {
          console.log('here1');
          setMessages(doc.data().messages);
        } else {
          setMessages([]);
          console.log('here2');
        }
      });

    setTimeout(() => {
      setLoader(false);
    }, 2000);

    return () => {
      unSub();
    };
  };

  const uploadImage = async res => {
    let storageRef;
    setLoader(true);
    const { uri } = res.assets[0];
    console.log("hereee uri", uri)
    const parts = uri.split('/');
    const filename = parts[parts.length - 1];
    storageRef = store.ref().child(`images/${filename}`);
   

    
    const blob = await fetch(uri).then((response) => response.blob());
    const uploadTask = storageRef.put(blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
      },
      (error) => {
        console.error(error);
      },
      async () => {
        const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
        await db.collection("chats").doc(chatInfo.chatId).update({
          messages: firebase.firestore.FieldValue.arrayUnion({
            id: uuidv4(),
            text:msg,
            senderId: userInfo.uid,
            date: firebase.firestore.Timestamp.now(),
            img: downloadURL,
          }),
        });
      }
    );
    setTimeout(()=> {

      setLoader(false);
    },5000)

    //Image Send
  };

  const pickImage = async () => {
    console.log('jeeee');
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

  const handleSend = async () => {
    console.log('text', msg);
    console.log('here 2');
    await db
      .collection('chats')
      .doc(chatInfo.chatId)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          id: uuidv4(),
          text: msg,
          senderId: userInfo.uid,
          date: firebase.firestore.Timestamp.now(),
        }),
      });

    await db
      .collection('userChats')
      .doc(userInfo.uid)
      .update({
        [chatInfo.chatId + '.lastMessage']: {
          text: msg,
        },
        [chatInfo.chatId + '.date']:
          firebase.firestore.FieldValue.serverTimestamp(),
      });

    await db
      .collection('userChats')
      .doc(chatInfo.chatUserUid)
      .update({
        [chatInfo.chatId + '.lastMessage']: {
          text: msg,
        },
        [chatInfo.chatId + '.date']:
          firebase.firestore.FieldValue.serverTimestamp(),
      });

    setMsg('');
    //Refresh

    const unSub = firestore()
      .collection('chats')
      .doc(chatInfo.chatId)
      .onSnapshot(doc => {
        console.log('messsageee data', doc.data());
        if (doc.data().hasOwnProperty('messages')) {
          console.log('here1');
          setMessages(doc.data().messages);
        } else {
          setMessages([]);
          console.log('here2');
        }
      });
    //Refresh
  };
  

  return (
    <>
      {!loader ? (
        <>
          {logged ? (
            <View
              style={{
                flex: 1,
                height: '100%',
                paddingBottom: 50,
                backgroundColor: '#fff',
              }}>
              {/* Chats */}
              <View>
                <ScrollView
                  ref={scrollViewRef}
                >
                  {messages.map((msg, index) => (
                    <View
                    onLayout={handleLayout}
                      key={index}
                      style={{
                        alignSelf:
                          msg.senderId != userInfo.uid
                            ? 'flex-start'
                            : 'flex-end',
                        marginHorizontal: 10,
                        marginVertical: 4,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      {msg.senderId != userInfo?.uid ? (
                        <>
                          <View>
                            <Image
                              source={{uri: chatInfo?.photoUrl}}
                              style={{width: 40, borderRadius: 30, height: 40}}
                            />
                            <Text style={{fontSize: 10, marginTop: 3}}>
                              {moment(msg?.date.seconds).format('LT')}
                            </Text>
                          </View>
                          <View
                            style={{
                              paddingHorizontal: 10,
                              marginHorizontal: 10,
                              borderWidth: 0.2,
                              backgroundColor: '#fff',
                              marginRight: 5,
                              paddingVertical: 5,
                              borderRadius: 5,
                            }}>
                            <Text>{msg.text}</Text>
                            {msg.img && (
                              <Image
                                source={{uri: msg?.img}}
                                style={{width: 150, height: 150}}
                              />
                            )}
                          </View>
                        </>
                      ) : (
                        <>
                          <View
                            style={{
                              paddingHorizontal: 10,
                              borderWidth: 0.2,
                              backgroundColor: '#fff',
                              marginRight: 5,
                              paddingVertical: 5,
                              borderRadius: 5,
                            }}>
                            <Text>{msg.text}</Text>
                            {msg.img && (
                              <Image
                                source={{uri: msg?.img}}
                                style={{width: 150, height: 150}}
                              />
                            )}
                          </View>
                          <View>
                            <Image
                              source={{uri: userInfo?.photoURL}}
                              style={{width: 40, borderRadius: 30, height: 40}}
                            />
                            <Text style={{fontSize: 10, marginTop: 3}}>
                              {moment(msg?.date.seconds).format('LT')}
                            </Text>
                          </View>
                        </>
                      )}
                    </View>
                  ))}
                </ScrollView>
              </View>
              {/* Chats */}
              {blockmsg == "" ? (
<>

              <View style={styles.messageTypeBox}>

                <TextInput
                  value={msg}
                  style={styles.textInput}
                  placeholder="Enter a message"
                  secureTextEntry={false}
                  onChangeText={text => setMsg(text)}
                />
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Pressable onPress={() => pickImage()}>
                    <TouchableOpacity onMagicTap={() => pickImage()}>
                      <Image
                        source={{
                          uri: 'https://cdn-icons-png.flaticon.com/128/739/739249.png',
                        }}
                        style={{width: 25, marginRight: 10, height: 25}}
                        onPress={() => pickImage()}
                      />
                    </TouchableOpacity>
                  </Pressable>
                  <Button title="send" onPress={handleSend}></Button>
                </View>
              </View>
</>
              ):(
                <View style={{alignSelf:"center", marginVertical:10}}>
                <Text>{blockmsg}</Text>
                </View>

              )}


            </View>
          ) : (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={imagePath.chatIcon}
                style={{width: 150, height: 150}}
              />
              <Text>No history found.</Text>
            </View>
          )}
        </>
      ) : (
        <View style={{flex: 1, alignItems: 'center', marginTop: '60%'}}>
          <ActivityIndicator size="large" color={colors.secondary} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  toLabel: {
    marginLeft: 15,
    marginVertical: 15,
  },
  textInput: {
    width: '70%',
    borderWidth: 0.3,
    marginVertical: 2,
    borderRadius: 5,
  },
  textInputMessage: {
    width: '90%',
    marginLeft: 20,
  },
  messageTypeBox: {
    position: 'absolute',
    borderTopWidth: 0.3,
    borderColor: colors.textGrey,
    bottom: 0,
    justifyContent: 'space-between',
    height: 50,
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#F7F7F7',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

ChatScreen.navigationOptions = {
  title: 'Chat Screen',
};
