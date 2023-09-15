import {isAbsolute} from 'path';
import React from 'react';
import {Text, Image, ImageBackground, StyleSheet, View} from 'react-native';
import colors from '../constants/colors';

export default function CardCarousel(props) {
  return (
    <View style={styles.CardCarouselBox}>
      <ImageBackground
        style={styles.CardCarouselImage}
        source={{uri: props.image}}>
        <View style={styles.CardCarouselInnerBox}>
          <Text style={styles.CardCarouselLabel}>{props.title}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  CardCarouselBox: {
    marginVertical: 10,

    borderRadius: 5,
    marginHorizontal: 5,

    overflow: 'hidden',
  },
  CardCarouselInnerBox: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 5,

    width: 100,
    height: 130,
  },
  CardCarouselImage: {
    width: 100,
    borderRadius: 5,
    height: 130,
  },
  CardCarouselLabel: {
    position: 'absolute',
    marginLeft: 10,
    bottom: 5,
    fontSize: 14,
    color: colors.textWhite,
    fontWeight: '400',
  },
});
