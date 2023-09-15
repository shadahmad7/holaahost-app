import React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../../constants/colors';
import GroupStrip from '../../Components/GroupStrip';
import OverviewCard from '../../Components/OverviewCard';
import {ScrollView} from 'react-native-gesture-handler';
import HeaderLabel from '../../Components/HeaderLabel';
import ContainerHead from '../../Components/ContainerHead';
import GridCard from '../../Components/GridCard';
import { useNavigation } from '@react-navigation/native';

export default function ExploreScreen() {
  const scheduleData = [
    {id: 1, name: 'Starting soon'},
    {id: 2, name: 'Today'},
    {id: 3, name: 'Tomorrow'},
    {id: 4, name: 'This week'},
    {id: 5, name: 'This weekend'},
    {id: 5, name: 'Next week'},
    {id: 5, name: 'Next weekend'},
    {id: 5, name: 'All Upcoming'},
  ];

  const cardData = [
    {
      name: 'Justice League',
      image:
        'https://darkknightnews.com/wp-content/uploads/2017/04/unitetheleaguejusticeleaguebanner.jpg',
    },
    {
      name: 'Shazam',
      image:
        'https://static-koimoi.akamaized.net/wp-content/new-galleries/2019/04/shazam-movie-review-2.jpg',
    },
    {
      name: 'Aquaman',
      image:
        'https://www.komico.ca/wp-content/uploads/2018/07/dc-aquaman-movie.jpg',
    },
    {
      name: 'Joker',
      image:
        'https://cdna.artstation.com/p/assets/images/images/017/022/542/large/amirhosein-naseri-desktop-screenshot-2019-04-03-18-17-47-11.jpg?1554338571',
    },
    {
      name: 'The Batman',
      image:
        'https://pbs.twimg.com/media/FfXP-G1aMAEd5jj?format=jpg&name=medium',
    },
  ];
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
  const [search, setSearch] = React.useState('');
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          {/* Search Icon */}
          <View style={styles.searchSection} onTouchEnd={() => navigation.navigate("SearchScreen")}>
            <FontAwesome5Icon
              style={styles.searchIcon}
              name="search"
              size={20}
              color="#2a2a2a"
            />
            <TextInput
              style={styles.input}
              placeholder="Search upcoming events"
              disabled={true}
              onChangeText={search => setSearch(search)}
              underlineColorAndroid="transparent"
            />
          </View>
          
          {/* Search Icon */}
          {/* Location Indicator */}
          <View style={styles.locationIndicatorSection}>
            <View>
              <Text style={styles.cityLabel}>Find events near</Text>
              <Text style={styles.city}>New York, NY</Text>
            </View>
            <View
              style={[styles.locationIndicatorSection, {marginHorizontal: 10}]}>
              <FontAwesome5Icon
                style={styles.searchIcon}
                name="location-arrow"
                size={20}
                color={colors.primary}
              />
              <Text style={styles.changeButton}>Change</Text>
            </View>
          </View>
          {/* Location Indicator */}
          {/* Schedule Date */}
          <View style={styles.scheduleContainer}>
            {scheduleData.map((day, index) => (
              <View style={styles.box} key={index}>
                <Text style={{fontSize: 13}}>{day.name}</Text>
              </View>
            ))}
          </View>
          {/* Schedule Date */}
          {/* Find Group */}
          <GroupStrip
            title="Find a group you like"
            subTitle="Match your interests with a group"
          />
          {/* Find Group */}
          <View style={styles.gapStrip} />
          {/* Explore groups */}
          <Text style={styles.exploreHolaahostLabel}>Explore HolaaHost</Text>
          <ContainerHead title="Movies" />
          <View style={styles.cardContainer}>
            <ScrollView horizontal={true} contentContainerStyle={styles.scroll}>
              {cardData.map((card, index) => (
                <OverviewCard key={index} image={card.image} name={card.name} />
              ))}
            </ScrollView>
          </View>
          <GroupStrip
            title="Start a new group"
            subTitle="Organize your own interests"
          />
          <View style={styles.lastSection}>
            <View style={styles.containerHeadBox}>
              <Text style={styles.containerHeadLabel}>Browse by category</Text>
            </View>
            <View style={styles.gridContainer}>
              {categoryData.map((card, index) => (
                <View style={styles.gridCardContainer}>
                  <GridCard key={index} title={card.name} image={card.image} />
                </View>
              ))}
            </View>
          </View>
          {/* Explore groups */}
        </ScrollView>
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
    marginVertical: 10,
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
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
  locationIndicatorSection: {
    flexDirection: 'row',
    marginHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cityLabel: {
    fontSize: 13,
    fontWeight: '300',
  },
  city: {
    fontSize: 22,
    fontWeight: '600',
  },
  changeButton: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: '500',
  },
  scheduleContainer: {
    flexWrap: 'wrap',

    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 20,
  },
  box: {
    flexBasis: '46%',
    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 0.9,
    borderColor: 'black',
    height: 40,
  },
  exploreHolaahostLabel: {
    fontSize: 16,
    marginVertical: 10,
    marginHorizontal: 15,
    fontWeight: '600',
  },
  gapStrip: {
    backgroundColor: '#B1B1B1',
    height: 6,
  },
  cardContainer: {
    // flex: 1,
    marginHorizontal: 8,
  },
  scroll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastSection: {
    backgroundColor: '#000',
  },
  containerHeadBox: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  containerHeadLabel: {
    fontSize: 20,
    color: '#fff',
    paddingTop: 10,
    fontWeight: '600',
  },
  gridContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingBottom: 30,
  },
  gridCardContainer: {
    flexBasis: 150,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: 'black',
    height: 140,
    marginVertical: 10,
  },
});
