import React, {useState} from 'react';
import {
  Text,
  useWindowDimensions,
  View,
  TextInput,
  Pressable,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import GuestPage from '../../Components/GuestPage';
import imagePath from '../../constants/imagePath';
import ContainerHead from '../../Components/ContainerHead';

import colors from '../../constants/colors';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import SearchGridCard from '../../Components/SearchGridCard';
import OverviewCard from '../../Components/OverviewCard';
import {useNavigation} from '@react-navigation/core';
import {FAB, Portal, Provider} from 'react-native-paper';
import OverviewCard2 from '../../Components/OverviewCard2';
import {getAllGroups} from '../../actions/groupAction';
import {getAllGroupCategories} from '../../actions/groupCategoryAction';
import {getAllEvents} from '../../actions/eventAction';
import {getAllEventCategories} from '../../actions/eventCategoryAction';
import {searchGlobal} from '../../actions/profileAction';
import HTMLView from 'react-native-htmlview';
import moment from 'moment/moment';
import {set} from 'react-native-reanimated';





export default function HomeScreen() {
  const [show, setShow] = React.useState(false);
  const [keyword, setKeyword] = React.useState('');

  const [loading, setLoading] = useState(true);

  const [groupData, setGroupData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [groupCatData, setGroupCatData] = useState([]);
  const [eventCatData, setEventCatData] = useState([]);
  const [blogData, setBlogData] = useState([]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();

    });
    return unsubscribe;
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    let groupRes = await getAllGroups();
    let groupCatRes = await getAllGroupCategories();
    let eventRes = await getAllEvents();
    let eventCatRes = await getAllEventCategories();

    setGroupData(groupRes.data.data);
    setGroupCatData(groupCatRes.data.data);
    setEventData(eventRes.data.data);
    setEventCatData(eventCatRes.data.data);
    console.log(
      'heree all data ',
      groupRes,
      groupCatRes,
      eventRes,
      eventCatRes,
    );
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const navigation = useNavigation();

  const [state, setState] = React.useState({open: false});

  const onStateChange = ({open}) => setState({open});

  const {open} = state;

  const onSearch = async () => {
    setLoading(true);
    console.log('jeee', keyword);
    let action = await searchGlobal(keyword);
    console.log('kmfkflmfk', action);
    setGroupData(action.group);
    setGroupCatData(action.groupcategory);
    setEventData(action.events);
    setEventCatData(action.eventcategory);
    setBlogData(action.blogs);
    setKeyword('');
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {!loading ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          {show ? (
            <GuestPage
              title="Follow your groups and events"
              subTitle="See what's you've coming up plus the best suggested events near you."
              image={imagePath.welcomeIcon}
            />
          ) : (
            <View>
              <View
                style={styles.searchSection}
                // onTouchEnd={() => navigation.navigate('SearchScreen')}
              >
                <TextInput
                  style={styles.input}
                  onSubmitEditing={search => {
                    setKeyword(search), onSearch();
                  }}
                  placeholder="Search events"
                  onChangeText={search => setKeyword(search)}
                  underlineColorAndroid="transparent"
                />
                <FontAwesome5Icon
                  style={styles.searchIcon}
                  name="search"
                  size={19}
                  color="#ffff"
                  onPress={() => navigation.goBack(null)}
                />
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                {keyword.length > 0 && (
                  <View style={{marginVertical: 10, marginHorizontal: 20}}>
                    <Text>Search results for : {keyword}</Text>
                  </View>
                )}

                <ContainerHead title="Browse Groups by categories" type="cat" />
                {groupCatData.length > 0 ? (
                  <ScrollView
                    horizontal={true}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                      marginVertical: 10,
                      flexDirection: 'row',
                    }}>
                    {groupCatData.map((cat, index) => (
                      <Pressable
                        onPress={() =>
                          navigation.navigate('Groups', {
                            groupCatId: cat.id,
                          })
                        }>
                        <SearchGridCard
                          key={index}
                          title={cat.group_category_name}
                          image={cat.group_category_image}
                        />
                      </Pressable>
                    ))}
                  </ScrollView>
                ) : (
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text>No group category found</Text>
                  </View>
                )}

                <ContainerHead title="Events" type="Events" />
                <View style={styles.cardContainer}>
                  {eventData.length > 0 ? (
                    <ScrollView
                      horizontal={true}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.scroll}>
                      {eventData.slice(0, 10).map((card, index) => (
                        <Pressable
                          onPress={() =>
                            navigation.navigate('EventDetail', {
                              eventId: card.id,
                              eventTitle: card.event_name,
                            })
                          }>
                          <OverviewCard2
                            key={index}
                            image={card.event_image}
                            name={card.event_name}
                            seats={card.event_seats}
                            location={card.event_location}
                          />
                        </Pressable>
                      ))}
                    </ScrollView>
                  ) : (
                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Text>No events found</Text>
                    </View>
                  )}
                </View>

                <ContainerHead title="Browse Events by categories" type="cat" />
                {eventCatData.length > 0 ? (
                  <ScrollView
                    horizontal={true}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                      marginVertical: 10,
                      flexDirection: 'row',
                    }}>
                    {eventCatData.map((cat, index) => (
                      <Pressable
                        onPress={() =>
                          navigation.navigate('Events', {
                            eventCatId: cat.id,
                          })
                        }>
                        <SearchGridCard
                          key={index}
                          title={cat.event_category_name}
                          image={cat.event_category_image}
                        />
                      </Pressable>
                    ))}
                  </ScrollView>
                ) : (
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text>No event category found</Text>
                  </View>
                )}

                <ContainerHead title="Groups" type="Groups" />
                <View style={styles.cardContainer}>
                  {groupData.slice(0,10).length > 0 ? (
                    <ScrollView
                      horizontal={true}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.scroll}>
                      {groupData.map((card, index) => (
                        <Pressable
                          onPress={() =>
                            navigation.navigate('GroupDetail', {
                              groupId: card.id,
                              groupTitle: card.group_name,
                            })
                          }>
                          <OverviewCard
                            key={index}
                            image={card.group_image}
                            name={card.group_name}
                            members={card.members_count}
                            comments={card.comments_count}
                            location={card.group_location}
                          />
                        </Pressable>
                      ))}
                    </ScrollView>
                  ) : (
                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Text>No groups found</Text>
                    </View>
                  )}
                </View>

                {/* <ContainerHead title="Your Groups"  type="Groups" />
              <View style={styles.cardContainer}>
              {groupData.length > 0 ? (

                <ScrollView
                  horizontal={true}
                  showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.scroll}>
                  {groupData.map((card, index) => (
                    <OverviewCard
                      key={index}
                      image={card.group_image}
                      name={card.group_name}
                      members={card.members_count}
                      comments={card.comments_count}
                      location={card.group_location}
                    />
                  ))}
                </ScrollView>
              ):(
                <View style={{justifyContent:"center", alignItems:"center"}}>
                <Text>No groups found</Text>
                </View>
              )}
              </View> */}

                {blogData.length > 0 && (
                  <>
                    <ContainerHead title="Blogs" />
                    <View style={styles.cardContainer}>
                      <ScrollView
                        horizontal={true}
                        contentContainerStyle={styles.scroll}>
                        {blogData.map(blog => (
                          <View style={styles3.card} key={blog.id}>
                            <Text>
                              {' '}
                              {moment(blog.created_at).format(
                                'YYYY-MM-DD hh:mm',
                              )}
                            </Text>
                            <Text style={styles3.title}>{blog.blog_title}</Text>

                            <View style={styles3.fadeOut}>
                              {/* <Text style={styles3.description}>
                            {blog.blog_desc}
                          </Text> */}
                              <HTMLView
                                value={blog.blog_desc}
                                stylesheet={htmlstyles}
                                onLinkPress={url =>
                                  console.log('clicked link: ', url)
                                }
                              />
                            </View>

                            <Text>By Admin</Text>
                          </View>
                        ))}
                      </ScrollView>
                    </View>
                  </>
                )}
              </ScrollView>
            </View>
          )}
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            marginTop: '50%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
      {/* Need to make dynamic */}

      <Provider>
        <Portal>
          <FAB.Group
            open={open}
            visible
            color={'white'}
            fabStyle={{backgroundColor: colors.primary}}
            icon={open ? 'close' : 'plus'}
            actions={[
              {
                icon: 'google-classroom',
                label: 'Group',
                onPress: () => navigation.navigate('Create Group'),
              },
              {
                icon: 'calendar-today',
                label: 'Event',
                onPress: () => navigation.navigate('Create Event'),
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
      </Provider>
    </View>
  );
}

var htmlstyles = StyleSheet.create({
  a: {
    fontWeight: '300',
    fontSize: 12,
  },
  p: {
    fontSize: 12,
  },
  strong: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  li: {
    fontSize: 12,
  },
});

const styles = StyleSheet.create({
  cardContainer: {
    // flex: 1,
    marginHorizontal: 10,
  },
  scroll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicatorStyle: {
    backgroundColor: colors.secondary,
    padding: 0.7,
    marginBottom: -2,
  },
  searchSection: {
    marginVertical: 10,
    height: 46,
    marginHorizontal: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 12,
    backgroundColor: colors.primary,
  },
  input: {
    flex: 1,
    paddingTop: 10,

    paddingLeft: 10,

    paddingBottom: 10,

    backgroundColor: '#fff',
    color: '#424242',
  },
  fab: {
    backgroundColor: colors.primary,
  },
});

const styles3 = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginVertical: 8,
    alignSelf: 'center',
    width: 220,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 120,
    marginVertical: 8,
    resizeMode: 'cover',
  },

  description: {
    color: '#bbb',
    marginVertical: 8,
  },
});
