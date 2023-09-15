//import liraries
import React, {Component, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Checkbox, FAB} from 'react-native-paper';
import ListingCard2 from '../../Components/ListingCard2';
import OverviewCard2 from '../../Components/OverviewCard2';
import colors from '../../constants/colors';
import ActionSheet from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/Feather';
import {color} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {getAllEventCategories} from '../../actions/eventCategoryAction';
import {getAllEvents, getAllFilteredEvents} from '../../actions/eventAction';

let arr1 = [],
  arr2 = [],
  arr3 = [],
  arr4 = [];

let TYPE = [];

// create a component
const Events = props => {
  const [loading, setLoading] = useState(true);
  const actionSheetRef = useRef(null);

  const [dayData, setDayData] = useState([
    {id: 1, name: 'Starting Soon', status: false},
    {id: 2, name: 'Today', status: false},
    {id: 3, name: 'Tomorrow', status: true},
    {id: 4, name: 'This Week', status: true},
    {id: 5, name: 'This Weekend', status: false},
    {id: 6, name: 'Next Week', status: false},
  ]);

  const [distanceData, setDistanceData] = useState([
    {id: 1, name: '2 KMS', value: 2, status: false},
    {id: 2, name: '5 KMS', value: 5, status: false},
    {id: 3, name: '10 KMS', value: 10, status: false},
    {id: 4, name: '50 KMS', value: 50, status: false},
    {id: 5, name: '100+ KMS', value: 101, status: false},
  ]);

  const [typeData, setTypeData] = useState([
    {id: 1, name: 'Online', status: false},
    {id: 2, name: 'Indoor', status: false},
    {id: 3, name: 'Outdoor', status: false},
  ]);

  const [catData, setCatData] = useState([
    {id: 1, name: 'Party', status: false},
    {id: 2, name: 'Technology', status: false},
    {id: 3, name: 'Gaming', status: false},
  ]);

  const [filterGroup, setFilterGroup] = useState([]);
  const [filterDay, setFilterDay] = useState([]);
  const [filterType, setFilterType] = useState([]);
  const [filterDistance, setFilterDistance] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [eventRes, setEventRes] = useState({});
  const [load, setLoad] = useState(false);


  const navigation = useNavigation();

  React.useEffect(() => {
    loadAll();
  }, []);



  const loadMore = async() => {
    setLoading(true);
    if(eventRes.next_page_url){
      var myHeaders = new Headers();
      myHeaders.append("Cookie", "mode=day");
      
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      
      await fetch(groupRes.next_page_url, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log("dddd", result)
          console.log("dddd", result.data.data)
          result;
          let arr = [...groupData]
          console.log("dddd", arr)
          
          let arr3 = arr.concat(result.data.data);
          console.log("dddd", arr3)
          setEventData(arr3);
          console.log("dddd", result.data.next_page_url)
          if(result.data.next_page_url){
            setLoad(true)
          } else {
            setLoad(false)
          }
        })
        .catch(error => console.log('error', error));
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
   
  };



  const loadAll = async () => {
    setLoading(true);
    setFilterGroup([]);
    setFilterDay([]);
    setFilterDistance([]);
    setFilterType([]);
    (arr1 = []), (arr2 = []), (arr3 = []), (arr4 = []);
    resetButton();

    let eventRes = await getAllEvents();
    setEventRes(eventRes.data);
    if(eventRes.data.next_page_url){
      setLoad(true)
    }
    setEventData(eventRes.data.data);

    let eventCatRes = await getAllEventCategories();
    let i,
      dataa = eventCatRes.data.data;

    setCatData(dataa);

    //If Category
    console.log('Cat Id', props.route.params?.eventCatId);
    let tmp = props.route.params?.eventCatId;
    if (tmp) {
      changeFilter(tmp, 'event');
      applyFilter();
      setFilterGroup([]);
      setFilterDay([]);
      setFilterDistance([]);
      setFilterType([]);
      (arr1 = []), (arr2 = []), (arr3 = []), (arr4 = []);
    }
    //If Category

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const changeFilter = async (data, section) => {
    console.log('daatatatata', data, section);
    if (section === 'event') {
      arr1 = [...filterGroup];
      if (!arr1.includes(data)) {
        arr1.push(data);
      } else {
        arr1 = arr1.filter(e => e !== data);
      }
      setFilterGroup(arr1);
      console.log('Event Cat Filter', arr1);
      arr2 = [...filterDay];
      arr3 = [...filterDistance];
      arr4 = [...filterType];
    }
    if (section === 'day') {
      arr2 = [...filterDay];
      if (!arr2.includes(data)) {
        arr2.push(data);
      } else {
        arr2 = arr2.filter(e => e !== data);
      }
      setFilterDay(arr2);
      console.log('Day Filter', arr2);
      arr1 = [...filterGroup];
      arr3 = [...filterDistance];
      arr4 = [...filterType];
    }
    if (section === 'distance') {
      arr3 = [...filterDistance];
      if (!arr3.includes(data)) {
        arr3.push(data);
      } else {
        arr3 = arr3.filter(e => e !== data);
      }
      setFilterDistance(arr3);
      console.log('Distance Filter', arr3);
      arr1 = [...filterGroup];
      arr2 = [...filterDay];
      arr4 = [...filterType];
    }
    if (section === 'type') {
      arr4 = [...filterType];
      if (!arr4.includes(data)) {
        arr4.push(data);
      } else {
        arr4 = arr4.filter(e => e !== data);
      }
      setFilterType(arr4);
      console.log('Type Filter', arr4);
      arr1 = [...filterGroup];
      arr2 = [...filterDay];
      arr3 = [...filterDistance];
    }
  };

  const applyFilter = async () => {
    setLoading(true);

    if (
      arr1.length === 0 &&
      arr2.length === 0 &&
      arr3.length === 0 &&
      arr4.length === 0
    ) {
      let eventRes = await getAllEvents();
      setEventData(eventRes.data.data);
    } else {
      console.log('filterssssssss', arr1, arr2, arr3, arr4);

      let eventFilterRes = await getAllFilteredEvents(arr1, arr2, arr3, arr4);
      console.log('data filtered', eventFilterRes);
      setEventData(eventFilterRes.data.data);
    }

    setTimeout(() => {
      setLoading(false);
    }, 4000);
  };

  const handleCheckBoxDays = day => {
    setDayData(
      dayData.map(checkBox => {
        if (checkBox.id === day.id) {
          checkBox.status = !checkBox.status;
        }
        return checkBox;
      }),
    );
    changeFilter(day.name, 'day');
  };

  const handleCheckBoxDistance = dis => {
    setDistanceData(
      distanceData.map(checkBox => {
        if (checkBox.id === dis.id) {
          checkBox.status = !checkBox.status;
        }
        return checkBox;
      }),
    );
    changeFilter(dis.value, 'distance');
  };
  const handleCheckBoxType = type => {
    setTypeData(
      typeData.map(checkBox => {
        if (checkBox.id === type.id) {
          checkBox.status = !checkBox.status;
        }
        return checkBox;
      }),
    );
    changeFilter(type.name, 'type');
  };

  const handleCheckBoxCat = id => {
    setCatData(
      catData.map(checkBox => {
        if (checkBox.id === id) {
          checkBox.status = !checkBox.status;
        }
        return checkBox;
      }),
    );
    changeFilter(id, 'event');
  };

  const resetButton = () => {
    setDayData(
      dayData.map(checkBox => {
        checkBox.status = false;

        return checkBox;
      }),
    );
    setDistanceData(
      distanceData.map(checkBox => {
        checkBox.status = false;
        return checkBox;
      }),
    );
    setTypeData(
      typeData.map(checkBox => {
        checkBox.status = false;
        return checkBox;
      }),
    );
    setCatData(
      catData.map(checkBox => {
        checkBox.status = false;
        return checkBox;
      }),
    );
  };

  return (
    <>
      {!loading ? (
        <View style={styles.container}>
          <View style={styles.cardContainer}>
            <ScrollView
              horizontal={false}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scroll}>
              {eventData.map((card, index) => (
                <Pressable
                  onPress={() => {
                    navigation.navigate('EventDetail', {
                      eventId: card.id,
                      eventTitle: card.event_name,
                    });
                  }}>
                  <ListingCard2
                    key={index}
                    image={card.event_image}
                    name={card.event_name}
                    seats={card.event_seats}
                    location={card.event_location}
                  />
                </Pressable>
              ))}
              {load && (
                <TouchableOpacity
                  onPress={loadMore}
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                    alignItems: 'center',
                    backgroundColor: colors.primary,
                    borderRadius: 5,
                  }}>
                  <Text style={{color: '#fff'}}>Load More</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
          <FAB
            icon="filter"
            style={styles.fab}
            onPress={() => actionSheetRef.current?.show()}
          />
          <ActionSheet ref={actionSheetRef}>
            <View style={styles.bottomSheet}>
              {/* Header */}
              <View style={styles.bottomSheetHeader}>
                <Text style={styles.bottomSheetHeaderText}>Filters</Text>

                <Icon
                  name="x"
                  size={22}
                  color="#444"
                  onPress={() => actionSheetRef.current?.hide()}
                />
              </View>
              {/* Header */}
              {/* Reset Button */}
              <View style={styles.resetButtonContainer}>
                <TouchableOpacity
                  style={styles.resetButton}
                  onPress={() => resetButton()}>
                  <Text style={styles.resetText}>Reset</Text>
                </TouchableOpacity>
              </View>
              {/* Reset Button */}
              {/* Any Day */}
              <View>
                <Text style={{fontSize: 16, marginLeft: 5, fontWeight: '600'}}>
                  Any Day
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 10,
                    alignItems: 'center',
                  }}>
                  <ScrollView
                    horizontal={true}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                    {dayData.map(day => (
                      <View
                        style={{
                          flexDirection: 'row',
                          paddingHorizontal: 10,
                          marginHorizontal: 2,
                          alignItems: 'center',
                        }}>
                        <Checkbox
                          color={colors.primary}
                          status={day.status ? 'checked' : 'unchecked'}
                          onPress={() => {
                            handleCheckBoxDays(day);
                          }}
                        />
                        <Text>{day.name}</Text>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </View>
              {/* Any Day */}

              {/* Separator */}
              <View
                style={{
                  flex: 1,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  paddingVertical: 10,
                  marginHorizontal: 10,
                }}
              />
              {/* Separator */}
              {/* Any Distance */}
              <View style={{marginVertical: 10}}>
                <Text style={{fontSize: 16, marginLeft: 5, fontWeight: '600'}}>
                  Any Distance
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 10,
                    alignItems: 'center',
                  }}>
                  <ScrollView
                    horizontal={true}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                    {distanceData.map(dis => (
                      <View
                        style={{
                          flexDirection: 'row',
                          paddingHorizontal: 10,
                          marginHorizontal: 2,
                          alignItems: 'center',
                        }}>
                        <Checkbox
                          color={colors.primary}
                          status={dis.status ? 'checked' : 'unchecked'}
                          onPress={() => {
                            handleCheckBoxDistance(dis);
                          }}
                        />
                        <Text>{dis.name}</Text>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </View>
              {/* Any Distance */}

              {/* Separator */}
              <View
                style={{
                  flex: 1,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  paddingVertical: 10,
                  marginHorizontal: 10,
                }}
              />
              {/* Separator */}
              {/* Any Type */}
              <View style={{marginVertical: 10}}>
                <Text style={{fontSize: 16, marginLeft: 5, fontWeight: '600'}}>
                  Any Type
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 10,
                    alignItems: 'center',
                  }}>
                  <ScrollView
                    horizontal={true}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                    {typeData.map(type => (
                      <View
                        style={{
                          flexDirection: 'row',
                          paddingHorizontal: 10,
                          marginHorizontal: 2,
                          alignItems: 'center',
                        }}>
                        <Checkbox
                          color={colors.primary}
                          onPress={() => {
                            handleCheckBoxType(type);
                          }}
                          status={type.status ? 'checked' : 'unchecked'}
                        />
                        <Text>{type.name}</Text>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </View>
              {/* Any Type */}

              {/* Separator */}
              <View
                style={{
                  flex: 1,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  paddingVertical: 10,
                  marginHorizontal: 10,
                }}
              />
              {/* Separator */}

              {/* Any Category */}
              <View style={{marginVertical: 10}}>
                <Text style={{fontSize: 16, marginLeft: 5, fontWeight: '600'}}>
                  Any Category
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 10,
                    alignItems: 'center',
                  }}>
                  <ScrollView
                    horizontal={true}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                    {catData.map(cat => (
                      <View
                        style={{
                          flexDirection: 'row',
                          paddingHorizontal: 10,
                          marginHorizontal: 2,
                          alignItems: 'center',
                        }}>
                        <Checkbox
                          color={colors.primary}
                          onPress={() => {
                            handleCheckBoxCat(cat.id);
                          }}
                          status={cat.status ? 'checked' : 'unchecked'}
                        />
                        <Text>{cat.event_category_name}</Text>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </View>
              {/* Any Category */}

              {/* Button */}
              <View style={styles.filterButtonContainer}>
                <TouchableOpacity
                  style={styles.filterButton}
                  onPress={() => applyFilter()}>
                  <Text style={styles.filterText}>Apply Filters</Text>
                </TouchableOpacity>
              </View>
              {/* Button */}
            </View>
          </ActionSheet>
        </View>
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
  cardContainer: {
    marginHorizontal: 10,
  },
  fab: {
    position: 'absolute',

    margin: 16,
    backgroundColor: colors.primary,
    right: 0,
    bottom: 0,
  },
  bottomSheet: {
    margin: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  bottomSheetHeader: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomSheetHeaderText: {
    fontSize: 20,
    fontWeight: '500',
  },
  resetButtonContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
    alignSelf: 'flex-end',
  },
  resetButton: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  resetText: {
    fontSize: 14,
    color: 'white',
  },
  filterButtonContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
    alignSelf: 'center',
  },
  filterButton: {
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    color: 'white',
  },
});

//make this component available to the app
export default Events;
