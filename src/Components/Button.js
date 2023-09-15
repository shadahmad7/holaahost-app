import React from 'react';
import {Text,StyleSheet, TouchableOpacity} from 'react-native';

export default function Button(props) {
 

  return (
    
      <TouchableOpacity onPress={props.onPress} disabled={props.disabled} style={[styles.appButtonContainer, props.style[0]]}>
        <Text style={[styles.appButtonText, props.style[1]]}>{props.title}</Text>
      </TouchableOpacity>
    
  );
}

const styles = StyleSheet.create({
   
    appButtonContainer: {
    //   elevation: 8,
      backgroundColor: "red",
      borderRadius: 5,
      paddingVertical: 15,
      width:"100%",
      paddingHorizontal: 12
    },
    appButtonText: {
      fontSize: 16,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
     
    }
  });