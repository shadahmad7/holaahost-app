import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';

export default function SocialButton(props) {
 
  return (
    
      <TouchableOpacity
        onPress={props.onPress}
        disabled={props.disabled}
        style={[styles.appButtonContainer, props.style[0]]}>
        <View style={styles.contentContainer}>
          <Image
           source={props.image}
            style={styles.image}
          />
          <Text style={[styles.appButtonText, props.style[1]]}>
            {props.title}
          </Text>
        </View>
      </TouchableOpacity>
    
  );
}

const styles = StyleSheet.create({
  appButtonContainer: {
    //   elevation: 8,
    // paddingRight: 50,
    backgroundColor: 'red',
    // flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 5,
    paddingVertical: 10,
    width: '100%',
    paddingHorizontal: 12,
  },
  contentContainer: {
    flexDirection: 'row',

    justifyContent: 'center',
  },
  appButtonText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  image: {
    width: 30,
    height: 30,
  },
});
