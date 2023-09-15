import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {blogById, deleteBlog} from '../../actions/blogsAction';
import colors from '../../constants/colors';
import {HtmlText} from '@e-mine/react-native-html-text';
import Video from 'react-native-video';
import {api} from '../../config/api';

let fileEx;
let bid = 0;
let admin;
let user;

const BlogDetail = props => {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [sound, setSound] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoader(true);
    console.log('hereeeee', props.route.params.blogId);
    bid = props.route.params.blogId;
    user = await AsyncStorage.getItem('@user');
    if (user) {
      user = await JSON.parse(user);
      console.log('userrrr', user);
    }

    console.log('ID', bid);
    let actionn = await blogById(props.route.params.blogId);
    console.log('acrtionn', actionn);
    setData(actionn?.data);
    checkFileExt(actionn?.data?.blog_image);
    setMediaUrl(data?.blog_image);
    admin = data?.first_name + data?.last_name;
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  };

  const checkFileExt = async resData => {
    fileEx = resData.split('.').pop();
    console.log('FFFFFFF', fileEx);
  };

  const removeBlog = async (id, gId) => {
    setLoader(true);
    let deleteBlogRes = await deleteBlog(id);
    console.log('blog delete', deleteBlogRes);
    setTimeout(() => {
      setLoader(false);
      navigation.navigate('GroupDetail');
    }, 2000);
  };

  useEffect(() => {
    // Create a new sound instance when the media URL changes
    if (fileEx === 'mp3' && mediaUrl) {
      setSound(
        new Sound(mediaUrl, '', error => {
          if (error) {
            console.log('Error loading sound:', error);
          }
        }),
      );
    }
  }, [mediaUrl]);

  const handlePlay = () => {
    // Play the sound
    if (sound) {
      sound.play(success => {
        if (success) {
          console.log('Sound played successfully');
        } else {
          console.log('Error playing sound');
        }
      });
    }
  };

  const handleStop = () => {
    // Stop the sound
    if (sound) {
      sound.stop();
    }
  };

  return (
    <>
      {!loader ? (
        <View style={styles.container}>
          <ScrollView>
            <View
              style={{
                marginHorizontal: 10,
                justifyContent: 'flex-start',
                alignItems:"flex-start",
                paddingHorizontal: 10,
              }}>
              {user?.name === admin && (
                <TouchableOpacity
                  onPress={() => removeBlog(data?.id)}
                  style={{
                    paddingHorizontal: 15,
                    borderRadius: 4,
                    width: 110,
                    marginTop: 20,
                    alignSelf: 'flex-end',
                    backgroundColor: colors.primary,
                    paddingVertical: 10,
                  }}>
                  <Text style={{color: '#fff'}}>Delete Blog</Text>
                </TouchableOpacity>
              )}

              <Text style={{fontSize: 18, fontWeight: '600', marginTop: 20}}>
                {data?.blog_title}
              </Text>

              {fileEx === 'mp4' && (
                <Video source={{uri: mediaUrl}} style={styles.video} />
              )}

              {fileEx === 'mp3' && (
                <View style={styles.audioContainer}>
                  <Text style={styles.audioTitle}>MP3 audio player</Text>
                  <View style={styles.audioControls}>
                    <Text style={styles.audioButton} onPress={handlePlay}>
                      Play
                    </Text>
                    <Text style={styles.audioButton} onPress={handleStop}>
                      Stop
                    </Text>
                  </View>
                </View>
              )}

              {fileEx === 'jpg' && (
                <View>
                  <Image
                    source={{uri: api.imageUrl + mediaUrl}}
                    style={{width: 60, height: 60}}
                  />
                </View>
              )}

              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  color: colors.primary,
                  marginVertical: 2,
                }}>
                By {data?.first_name}
              </Text>
              <View>
                <HtmlText>{data?.blog_desc}</HtmlText>
              </View>
            </View>
          </ScrollView>
        </View>
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  audioContainer: {
    alignItems: 'center',
  },
  audioTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  audioControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioButton: {
    margin: 10,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
});

export default BlogDetail;
