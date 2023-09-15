import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function InputHistory(props) {
  return (
    <View style={styles.container}>
      <View style={styles.containerInner}>
        <Icon name="clock" size={22} color="#888" />
        <Text style={styles.text}>{props.title}</Text>
      </View>
      <View style={styles.containerInner}>
        <Icon name="x" size={22} color="#888" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  containerInner: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    marginLeft:20,
    color: '#000',
    fontWeight: '400',
    alignSelf: 'center',
  },
});
