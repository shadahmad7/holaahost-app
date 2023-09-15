import React from 'react';
import {Text,StyleSheet, View} from 'react-native';
import colors from '../constants/colors';

export default function HeaderLabel(props) {
 

  return (
    
    <View style={styles.containerHeadBox}>
    <Text style={styles.containerHeadLabel}>{props.title}</Text>
   </View>
    
  );
}

const styles = StyleSheet.create({
   
    containerHeadBox:{
        flexDirection:"row",
        marginVertical:10,
        justifyContent:"space-between",
        alignItems:"center",
        marginHorizontal:20
      },
      containerHeadLabel:{
        fontSize:20,
        fontWeight:"600"
      },
    
  });