import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {Text,StyleSheet, View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../constants/colors';

export default function ContainerHead(props) {
  const navigation = useNavigation();
 



  return (
    <View style={styles.containerHeadBox}>
    <Text style={styles.containerHeadLabel}>{props.title}</Text>
    {props.type != "cat" && ( 
      <TouchableOpacity >
    <Text style={styles.containerHeadButton} onPress={()=> navigation.navigate(props.type)} >See all</Text>
      </TouchableOpacity>
    )}
   </View>
    
  );
}

const styles = StyleSheet.create({
   
    containerHeadBox:{
        flexDirection:"row",
        marginVertical:10,
        justifyContent:"space-between",
        alignItems:"center",
        marginHorizontal:15
      },
      containerHeadLabel:{
        fontSize:18,
        fontWeight:"600"
      },
      containerHeadButton:{
        fontSize:15,
        color:colors.primary,
        fontWeight:"400",
        textDecorationLine: 'underline',
      }
  });