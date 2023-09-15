import {isAbsolute} from 'path';
import React from 'react';
import {Text, Image, ImageBackground, StyleSheet, View} from 'react-native';
import colors from '../constants/colors';
import {Card} from 'react-native-shadow-cards';
import { api } from '../config/api';

export default function SearchGridCard(props) {
  return (
    <View style={styles.CardCarouselBox}>
      <Image style={styles.CardCarouselImage} source={{uri: api.imageUrl+props.image}} />
      <Text style={styles.CardCarouselLabel}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  CardCarouselBox: {
    marginVertical: 5,
    alignItems: "center",
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 9,
  },

  CardCarouselImage: {
    width: 70,
    borderRadius: 70,
    marginBottom:5,
    height: 70,
  },
  CardCarouselLabel: {
    color: '#000',
    textAlign:"center",
    fontSize: 14,
    width:80,
    fontWeight: '400',
  },
});
