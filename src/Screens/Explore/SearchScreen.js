import React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../../constants/colors';
import SearchGridCard from '../../Components/SearchGridCard';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import {useNavigation} from '@react-navigation/native';
import InputHistory from '../../Components/InputHistory';
import HeaderLabel from '../../Components/HeaderLabel';
import Filters from '../../Components/Filters';
import ListCard from '../../Components/ListCard';
import GroupStrip from '../../Components/GroupStrip';
export default function SearchScreen() {
  const categoryData = [
    {
      name: 'Arts & Movies',
      image:
        'https://img.freepik.com/premium-vector/colorful-movie-logo_18099-26.jpg?w=2000',
    },
    {
      name: 'Cooking',
      image:
        'https://img.freepik.com/premium-vector/cooking-logo-design-vector_18099-916.jpg',
    },
    {
      name: 'Sports',
      image:
        'https://img.freepik.com/premium-vector/modern-sports-logo-template-with-flat-design_23-2147946074.jpg?w=2000',
    },
    {
      name: 'Dancing',
      image:
        'https://img.freepik.com/premium-vector/dance-logo_48832-216.jpg?w=2000',
    },
    {
      name: 'Doctor',
      image:
        'https://img.freepik.com/premium-vector/heart-medical-shape-doctor-logo-design_23987-717.jpg?w=2000',
    },
  ];

  const groupData = [
    {
      id: 1,
      name: 'Google',
      image:
        'https://thenextscoop.com/wp-content/uploads/2018/03/5-Mind-Blowing-Facts-from-the-Google-Logo-Design-History.png',
    },
    {
      id: 2,
      name: 'Apple',
      image:
        'https://i.pinimg.com/originals/7a/27/b0/7a27b0a4d3636d47825e68ee67fdfb7a.jpg',
    },
    {
      id: 3,
      name: 'Samsung',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLRu8LhgWgY24Chn6OMxeLWKCrr9F_1uw7_9_b1CezpJ1m8Ga6D6V_E7xWektHkSIy9y4&usqp=CAU',
    },
    {
      id: 4,
      name: 'MI',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Xiaomi_logo.svg/768px-Xiaomi_logo.svg.png',
    },
    {
      id: 5,
      name: 'Oppo',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR853b1FDTgHiYZuTqQVbAH6zcRlTSF9Ktb7g&usqp=CAU',
    },
    {
      id: 6,
      name: 'Microsoft',
      image:
        'https://pbs.twimg.com/profile_images/1430639327189606407/WL6nmSHe_400x400.jpg',
    },
    {
      id: 7,
      name: 'Twitter',
      image:
        'https://about.twitter.com/content/dam/about-twitter/en/brand-toolkit/brand-download-img-1.jpg.twimg.1920.jpg',
    },
  ];

  const filters = [
    {id: 1, name: 'Sort'},
    {id: 2, name: 'All upcoming'},
    {id: 3, name: 'Any type'},
    {id: 4, name: 'Any distance'},
    {id: 5, name: 'Any category'},
  ];

  const [keyword, setKeyword] = React.useState('');
  const [search, setSearch] = React.useState('Pune Camp India');
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.container}>
        {/* Search Icon */}
        <View style={styles.searchSection}>
          <FontAwesome5Icon
            style={styles.searchIcon}
            name="arrow-left"
            size={19}
            color="#2a2a2a"
            onPress={() => navigation.goBack(null)}
          />
          <TextInput
            style={styles.input}
            onSubmitEditing={search => setKeyword(search)}
            placeholder="Search events"
            onChangeText={search => setKeyword(search)}
            underlineColorAndroid="transparent"
          />
        </View>

        {keyword ? (
          <View>
           
              <View style={styles.filterBox}>
                <TouchableOpacity style={styles.filterButton}>
                  <Icon name="sliders" size={18} color="#000" />
                </TouchableOpacity>
              </View>
            
            <View style={styles.divider} />
            {/* content searched */}
            <ScrollView>
              <View style={{paddingBottom: 120}}>
                {groupData.map((grp, index) => (
                  <ListCard key={index} image={grp.image} />
                ))}
              </View>
            </ScrollView>
            {/* content searched */}
          </View>
        ) : (
          <>
            <ScrollView>
              {/* <View
                style={styles.searchSection}
                onTouchEnd={() => navigation.navigate('SeachLocationScreen')}>
                <FontAwesome5Icon
                  style={styles.searchIcon}
                  name="map"
                  size={20}
                  color="#2a2a2a"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Pune Contonment"
                  disabled={true}
                  value={search}
                  onChangeText={search => setSearch(search)}
                  underlineColorAndroid="transparent"
                />
              </View> */}
              {/* Search Icon */}
              {/* Search Historu */}
              <InputHistory title="Born to shine - Diljit" />
              {/* Search Historu */}
              {/* Search by Category */}
            </ScrollView>
          </>
        )}

        {/* Search by Category */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchSection: {
    marginVertical: 7,
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,

    paddingRight: 10,

    paddingBottom: 10,
    paddingLeft: 5,
    backgroundColor: '#fff',
    color: '#424242',
  },
  divider: {
    height: 4,
    backgroundColor: '#ccc',
  },
  scroll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    padding: 7,
    marginHorizontal: 5,
    borderRadius: 44,
    alignItems: 'center',
    width: 33,
    backgroundColor: '#ccc',
  },
  allFilters: {
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  filterBox: {
    marginRight: 5,
    
    flexDirection: "row",
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 10,
    marginTop: 5,
  },
});
