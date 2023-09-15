import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../constants/colors';
import Button from './Button';

export default function BlankPage(props) {
//   console.log('JKNJKN', props);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.boxContainer}>
          <Image source={props.image} style={styles.image} />
          <Text style={styles.headerText}>{props.title}</Text>
          <Text style={styles.subHeaderText}>{props.subTitle}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent:'center'
  },
  boxContainer: {
    alignItems: 'center',
  },
  headerText: {
    lineHeight: 40,
    marginTop: 25,
    width: '70%',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '600',
  },
  subHeaderText: {
    marginTop: 10,
    lineHeight: 18,
    width: '70%',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
  },
  image: {
    width: 100,
    height: 100,
  },
});
