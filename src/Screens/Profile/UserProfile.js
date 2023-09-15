import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {
  Text,
  Dimensions,
  View,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import navigationStrings from '../../constants/navigationStrings';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import StackCard from '../../Components/StackCard';
import Label from '../../Components/Label';
import {ScrollView} from 'react-native-gesture-handler';
import colors from '../../constants/colors';
import Button from '../../Components/Button';
import GuestPage from '../../Components/GuestPage';
import imagePath from '../../constants/imagePath';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import { api } from '../../config/api';
import { logout } from '../../actions/authAction';

export default function UserProfile() {
  const [logged, setLogged] = useState(true);
  const [loading, setLoading] = useState(true);
  const [pic, setPic] = useState('');
  const [bio, setBio] = useState('');
  const [name, setName] = useState('');
  const navigation = useNavigation();

  const onLoggedOut = async () => {
   logout();
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();

    });
    return unsubscribe;
    
  }, []);

  const loadData = async () => {
    setLoading(true);
    let userData = await AsyncStorage.getItem('@user');
    let token = await AsyncStorage.getItem('@token');
    console.log("hereee", userData, token)

    if (userData) {
      setLogged(true);
      userData = JSON.parse(userData);
      setPic(userData?.photoUrl);
      setBio(userData?.bio);
      setName(userData?.name);
      console.log('userrrr', userData);
    } else {
      setLogged(false)
    }
    setTimeout(()=> {

      setLoading(false);
    },3000)
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {logged ? (
        <ScrollView>
          {!loading ? (
            <View>
              <View style={styles.bioSection}>
                <Image
                  style={styles.image}
                  source={{
                    uri: pic
                      ? api.imageUrl+pic
                      : 'https://cdn-icons-png.flaticon.com/128/149/149071.png',
                  }}
                />
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.bio}>{bio}</Text>

                {/* <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                  alignSelf: 'center',
                }}>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/733/733547.png',
                  }}
                  style={{width: 20, height: 20, marginHorizontal: 4}}
                />
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/733/733579.png',
                  }}
                  style={{width: 20, height: 20, marginHorizontal: 4}}
                />
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/3670/3670147.png',
                  }}
                  style={{width: 20, height: 20, marginHorizontal: 4}}
                />
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/174/174855.png',
                  }}
                  style={{width: 20, height: 20, marginHorizontal: 4}}
                />
              </View> */}
              </View>
              <View style={styles.memberSection}>
                <Pressable onPress={() => navigation.navigate('Edit Profile')}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 5,
                      padding: 10,
                      marginHorizontal: 20,
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.memberLabel}>Edit Profile</Text>
                    <Icon name="chevron-right" size={16} color="#000" />
                  </View>
                </Pressable>

                <Pressable
                  onPress={() => navigation.navigate('Change Password')}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 5,
                      padding: 10,
                      marginHorizontal: 20,
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.memberLabel}>Change Password</Text>
                    <Icon name="chevron-right" size={16} color="#000" />
                  </View>
                </Pressable>

                <Pressable onPress={() => navigation.navigate('My Groups')}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 5,
                      padding: 10,
                      marginHorizontal: 20,
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.memberLabel}>Groups</Text>
                    <Icon name="chevron-right" size={16} color="#000" />
                  </View>
                </Pressable>

                <Pressable onPress={() => navigation.navigate('My Events')}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 5,
                      padding: 10,
                      marginHorizontal: 20,
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.memberLabel}>Events</Text>
                    <Icon name="chevron-right" size={16} color="#000" />
                  </View>
                </Pressable>

                <Pressable onPress={() => navigation.navigate('Payments')}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 5,
                      padding: 10,
                      marginHorizontal: 20,
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.memberLabel}>Payments</Text>
                    <Icon name="chevron-right" size={16} color="#000" />
                  </View>
                </Pressable>

                <Pressable onPress={() => navigation.navigate('Bank Account')}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 5,
                      padding: 10,
                      marginHorizontal: 20,
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.memberLabel}>Bank Account</Text>
                    <Icon name="chevron-right" size={16} color="#000" />
                  </View>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('Achievement')}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 5,
                      padding: 10,
                      marginHorizontal: 20,
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.memberLabel}>Achievements</Text>
                    <Icon name="chevron-right" size={16} color="#000" />
                  </View>
                </Pressable>

                <Pressable onPress={onLoggedOut}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      width: 100,
                      borderRadius: 10,
                      backgroundColor: colors.primary,
                      alignItems: 'center',
                      marginVertical: 10,
                      paddingVertical: 10,
                      paddingHorizontal: 6,
                      marginHorizontal: 30,
                      justifyContent: 'flex-start',
                    }}>
                    <Text style={styles.logout}>Log Out</Text>
                    <Icon
                      name="log-out"
                      size={16}
                      color="#fff"
                      style={{marginLeft: 10}}
                    />
                  </View>
                </Pressable>
              </View>
            </View>
          ) : (
            <View style={{justifyContent:"center", flex:1,marginTop:"50%",  alignItems:'center'}}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          )}
        </ScrollView>
      ) : (
        <GuestPage
          title="Create your own profile."
          subTitle="Stay in touch with the members and organizers you meet."
          image={imagePath.userIcon}
        />
      )}
    </View>
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
  name: {
    paddingVertical: 10,
    fontSize: 19,

    fontWeight: '600',
  },
  bio: {
    paddingVertical: 5,
    fontSize: 16,

    fontWeight: '400',
  },
  divider: {
    height: 3,
    marginVertical: 15,
    backgroundColor: '#ccc',
  },
  hightlightBox: {
    flexDirection: 'row',
    borderBottomWidth: 0.3,
    borderTopWidth: 0.3,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '90%',
  },
  memberLabel: {
    fontSize: 16,
    paddingLeft: 10,
    fontWeight: '500',
  },
  logout: {
    fontSize: 14,
    color: '#fff',
    paddingLeft: 10,
    fontWeight: '500',
  },
  interestBox: {
    flexDirection: 'row',
    paddingHorizontal: 6,
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 10,
    width: Dimensions.get('window').width,
  },
  eventCountBox: {
    marginHorizontal: 15,
    padding: 12,
    alignItems: 'center',
  },
  groupCountBox: {
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 15,
  },
  eventCountLabel: {
    fontSize: 20,

    fontWeight: '700',
  },
  groupCountLabel: {
    fontSize: 20,
    fontWeight: '700',
  },
  loginButton: {
    backgroundColor: colors.primary,
    marginVertical: 20,
    width: 260,
    alignSelf: 'center',
    marginVertical: 10,
  },
  loginButtonText: {
    color: '#fff',
    alignItems: 'center',
  },
});
