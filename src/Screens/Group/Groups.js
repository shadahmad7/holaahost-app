//import liraries
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

import colors from '../../constants/colors';
import ActionSheet from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/Feather';
import ListingCard from '../../Components/ListingCard';
import navigationStrings from '../../constants/navigationStrings';
import {useNavigation} from '@react-navigation/native';
import {getAllFilteredGroups, getAllGroups} from '../../actions/groupAction';
import {getAllGroupCategories} from '../../actions/groupCategoryAction';



let arr1 = [],
arr2 = [];


// create a component
const Groups = (props) => {
  const navigation = useNavigation();

  const actionSheetRef = useRef(null);

  const [distanceData, setDistanceData] = useState([
    {id: 1, name: '2 KMS', value: 2, status: false},
    {id: 2, name: '5 KMS', value: 5, status: false},
    {id: 3, name: '10 KMS', value: 10, status: false},
    {id: 4, name: '50 KMS', value: 50, status: false},
    {id: 5, name: '100+ KMS', value: 101, status: false},
  ]);

  const [catData, setCatData] = useState([
    {id: 1, name: 'Filmography', status: false},
    {id: 2, name: 'Science', status: false},
    {id: 3, name: 'Cooking', status: false},
  ]);

  const [loading, setLoading] = useState(true);

  const [filterGroup, setFilterGroup] = useState([]);
  const [filterDay, setFilterDay] = useState([]);
  const [filterType, setFilterType] = useState([]);
  const [filterDistance, setFilterDistance] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [groupRes, setGroupRes] = useState({});
  const [load, setLoad] = useState(false);

  React.useEffect(() => {
    loadAll();
  }, []);


  const loadMore = async() => {
    setLoading(true);
    if(groupRes.next_page_url){
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
          setGroupData(arr3);
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
  
    
    (arr1 = []), (arr2 = []), resetButton();
    
    let groupRes = await getAllGroups();
    setGroupRes(groupRes.data);
    if(groupRes.data.next_page_url){
      setLoad(true)
    }
    setGroupData(groupRes.data.data);
    
    let groupCatRes = await getAllGroupCategories();
    let i,
    dataa = groupCatRes.data.data;
    
    setCatData(dataa);

  
    setFilterGroup([]);
    setFilterDistance([]);



    //If Category
    // console.log('Cat Id', props.route.params.groupCatId);
    let tmp =  props.route.params?.groupCatId;
    if(tmp){
      changeFilter(tmp, "group");
      applyFilter();
      
      setFilterGroup([]);
      setFilterDistance([]);
      (arr1 = []), (arr2 = [])
    } 
    //If Category

    setTimeout(() => {
      setLoading(false);
    }, 2000);
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

  const handleCheckBoxCat = id => {
    setCatData(
      catData.map(checkBox => {
        if (checkBox.id === id) {
          checkBox.status = !checkBox.status;
        }
        return checkBox;
      }),
    );
    changeFilter(id, 'group');
  };
  

  const changeFilter = async (data, section) => {
    console.log('daatatatata', data, section);
    if (section === 'group') {
      arr1 = [...filterGroup];
      if (!arr1.includes(data)) {
        arr1.push(data);
      } else {
        arr1 = arr1.filter(e => e !== data);
      }
      setFilterGroup(arr1);
      console.log('Group Cat Filter', arr1);

      arr2 = [...filterDistance];
    }

    if (section === 'distance') {
      arr2 = [...filterDistance];
      if (!arr2.includes(data)) {
        arr2.push(data);
      } else {
        arr2 = arr2.filter(e => e !== data);
      }
      setFilterDistance(arr2);
      console.log('Distance Filter', arr2);
      arr1 = [...filterGroup];
    }
  };

  const applyFilter = async () => {
    setLoading(true);

    if(arr1.length === 0 && arr2.length === 0){
      let groupRes = await getAllGroups();
    setGroupData(groupRes.data.data);
    } else {
      console.log('filterssssssss', arr1, arr2);

      let groupFilterRes = await getAllFilteredGroups(arr1, arr2);
      console.log('data filtered', groupFilterRes);
      setGroupData(groupFilterRes.data.data);
    }
   
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  };

  const resetButton = () => {
    setDistanceData(
      distanceData.map(checkBox => {
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
          {groupData.map((card, index) => (
            <Pressable
              onPress={() =>
                navigation.navigate('GroupDetail', {
                  groupId: card.id,
                  groupTitle: card.group_name,
                })
              }>
              <ListingCard
                key={index}
                image={card.group_image}
                name={card.group_name}
                members={card.members_count}
                comments={card.comments_count}
                location={card.group_location}
              />
            </Pressable>
          ))}
          {load && (

          <TouchableOpacity  onPress={loadMore} style={{paddingHorizontal:10, paddingVertical:15, alignItems:"center", backgroundColor:colors.primary, borderRadius:5}}>
            <Text style={{color:"#fff"}}>Load More</Text>
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
                    <Text>{cat.group_category_name}</Text>
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
    ):(
<View style={{justifyContent:"center", alignItems:"center", flex:1}}>
  <ActivityIndicator  size="large" color={colors.primary}  />
</View>
    )}
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    //   backgroundColor: '#2c3e50',
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
export default Groups;
