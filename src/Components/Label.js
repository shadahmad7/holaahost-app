import {isAbsolute} from 'path';
import React from 'react';
import {Text, Image, ImageBackground, StyleSheet, View} from 'react-native';
import colors from '../constants/colors';

export default function Label(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.2,
    borderRadius:2,
    marginHorizontal:7,
    marginVertical:10,
    borderColor: colors.primary,
    alignSelf: 'flex-start',
    padding:9
  },

  label: {
    fontSize: 14,
    borderColor: colors.primary,
    fontWeight: '500',
  },
});
