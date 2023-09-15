//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const AboutUs = () => {
    return (
        <View style={styles.container}>
            {/* <Text style={{marginLeft:20,fontSize:18, fontWeight:"700"}}>About Us</Text> */}
            <View style={{marginHorizontal:10, paddingHorizontal:10, paddingVertical:10, marginVertical:10}}>
                <Text style={{fontSize:16, fontWeight:"500"}}>
                Holaahost is an event hosting and blogging networking website where the users can host events, 
attend events and socialise via a blogging network. Members of the network can create blog 
groups and earn royalty by gaining followers. Also, Members can create or attend online, indoor 
or outdoor events at community level
                </Text>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default AboutUs;
