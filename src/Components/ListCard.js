import {isAbsolute} from 'path';
import React from 'react';
import {Text, Image, StyleSheet, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/Feather';

export default function ListCard(props) {
  return (
    <View style={styles.listCardBox}>
      <View style={{width: '65%'}}>
        <Text style={styles.dateLabel}>SAT, OCT 29- 5.00 PM</Text>
        <Text style={styles.titleLabel}>Global AI Developer Days Pune 2022</Text>
        <Text style={{color:"#111"}}>Pune Tech Community</Text>
        {/* Lower label */}
        <View style={{ flexDirection: 'row', marginVertical: 5}}>
          <Text>66 going •</Text>
          <Text style={{marginLeft:5}}>
            <FontAwesome5Icon
                name="video"
                size={14}
                color="#999"
            /> Online event
          </Text>
        </View>
        {/* Lower label */}
      </View>

      <View style={{width: '35%'}}>
        <View style={styles.listCardImageContainer}>
          <Image style={styles.listCardImage} source={{uri: props.image}} />
        </View>
        <View style={styles.shareOptions}>
          <Icon name="share" size={18} color="#444" />
          <Icon
            name="star"
            size={18}
            color="#444"
            style={{marginLeft: 10}}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listCardBox: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.7,
    borderBottomColor: '#ccc',
    marginHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 5,
  },
  listCardImage: {
    width: 100,
    height: 60,
    borderRadius: 4,
    alignSelf: 'flex-end',
  },
  shareOptions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 15,
    alignItems: 'center',
    paddingTop: 13,
    paddingBottom: 13,
  },
  dateLabel:{
    fontSize:12,
    color:"brown",
    fontWeight:"400",
    opacity:0.7
  },
  titleLabel:{
    fontSize:17,
    paddingTop:5,
    color:"#000",
    fontWeight:"600"
  }
});
