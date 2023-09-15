import {isAbsolute} from 'path';
import React from 'react';
import {Text, Image, ImageBackground, StyleSheet, View} from 'react-native';
import colors from '../constants/colors';

export default function StackCard(props) {
  return (
    <View style={styles.CardCarouselBox}>
      <Image style={styles.CardCarouselImage} source={{uri: props.image}} />
      <View style={styles.CardCarouselInnerBox}>
        <Text style={styles.CardCarouselMainLabel}>Pune Tech Community</Text>
        <Text style={styles.CardCarouselLabel}>2443 Members</Text>
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
    width: 70,
    borderRadius: 5,
    height: 70,
  },
  CardCarouselMainLabel: {
    marginLeft: 10,
    bottom: 5,
    fontSize: 16,
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
