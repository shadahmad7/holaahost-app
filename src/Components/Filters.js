import React from 'react';
import {Text,View,StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function Filters(props) {
 

  return (
    
    <View style={styles.filterButton}>
                <TouchableOpacity style={styles.filterButton}>
                  <Icon name="chevron-down" size={18} color="#000"style={{marginTop:2}} />
                  <Text style={styles.label}>{props.title}</Text>
                </TouchableOpacity>
              </View>
    
  );
}

const styles = StyleSheet.create({
    filterButton: {
        padding: 2,
        flexDirection:'row',

        marginHorizontal: 5,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent:"flex-start",
       
        backgroundColor: '#ccc',
      },
  label:{
    fontSize:14,
    marginLeft:7,
    fontWeight:'600'
  }
  });