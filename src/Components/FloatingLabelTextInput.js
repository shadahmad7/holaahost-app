import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import colors from '../constants/colors';

export default function FloatingLabelTextInput(props) {
    const [text, setText] = useState("");

    return (
      <View style={styles.container}>
      <TextInput
        label={props.title}
        defaultValue={props.defaultValue}
        secureTextEntry={props.secureTextEntry}
        mode='flat'
        keyboardSecurity={true}
        underlineColor={colors.primary}
        activeUnderlineColor={colors.secondary}
        keyboardType={props.keyboardType}
        value={props.value}
        onChangeText={props.onChangeText}
        style={styles.input}
        multiline = {props.multiline}
        numberOfLines = {props.numberOfLines}
      />
      </View>
    );
}
const styles = StyleSheet.create({
  container:{
    marginHorizontal:20,
    marginTop:10
   
  },
  input:{
 
  height:60, 
    backgroundColor:"#fff"
  }
})
