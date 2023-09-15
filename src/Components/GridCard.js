import {isAbsolute} from 'path';
import React from 'react';
import {Text, Image, ImageBackground, StyleSheet, View} from 'react-native';
import colors from '../constants/colors';
import {Card} from 'react-native-shadow-cards';

export default function GridCard(props) {
  return (
    <View style={styles.CardCarouselBox}>
      <View>
        <Image style={styles.CardCarouselImage} source={{uri: props.image}} />
      </View>

      <Text style={styles.CardCarouselLabel}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  CardCarouselBox: {
    marginVertical: 10,

    backgroundColor: 'transparent',
    borderRadius: 8,
    marginHorizontal: 5,
    paddingBottom: 20,
  },

  CardCarouselImage: {
    width: 170,
    borderRadius: 8,
    height: 120,
  },
  CardCarouselLabel: {
    position: 'absolute',
    bottom: -4,
    color: '#fff',

    fontSize: 14,
    color: colors.textWhite,
    fontWeight: '400',
  },
});
