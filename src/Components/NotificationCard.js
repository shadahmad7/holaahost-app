import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../constants/colors';
import Button from './Button';

export default function NotificationCard(props) {
//   console.log('JKNJKN', props);
  return (
    <View style={styles.CardCarouselBox}>
      <Image style={styles.CardCarouselImage} source={{uri: props.image}} />
      <View style={styles.CardCarouselInnerBox}>
        <Text style={styles.CardCarouselMainLabel}>last chance to join Pune Tech Community</Text>
        <Text style={styles.CardCarouselLabel}>2 days ago</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  CardCarouselBox: {
    marginVertical: 10,
    flexDirection: 'row',
    borderRadius: 5,
    marginHorizontal: 10,
    alignItems:"center"
   
  },
  CardCarouselInnerBox: {},
  CardCarouselImage: {
    width: 50,
    borderRadius: 65,
    height: 50,
  },
  CardCarouselMainLabel: {
    marginLeft: 10,
    bottom: 5,
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  CardCarouselLabel: {
    marginLeft: 10,
    bottom: 5,
    fontSize: 13,
    color: '#878787',
    fontWeight: '400',
  },
});
