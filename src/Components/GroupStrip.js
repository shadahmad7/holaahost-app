import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../constants/colors';
import Button from './Button';
import Icon from 'react-native-vector-icons/Feather';

export default function GuestPage(props) {
  return (
    <>
      <View style={styles.container}>
         <View style={styles.findGroupContainer}>
          <View>
            <Icon name="search" light size={26} color="black" normal />
          </View>
          <View>
            <Text>{props.title}</Text>
            <Text style={{fontSize:15}}>{props.subTitle}</Text>
          </View>
          <View>
            <Icon name="chevron-right" size={23} color="black" />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
  
    justifyContent:'center'
  },
  findGroupContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 15,
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
