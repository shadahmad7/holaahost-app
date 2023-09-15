import {isAbsolute} from 'path';
import React from 'react';
import {Text, Image, StyleSheet, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../constants/colors';
import {Card} from 'react-native-shadow-cards';
import { api } from '../config/api';

export default function OverviewCard2(props) {
  return (
    <Card style={styles.listCardBox}>
      <View style={styles.innerCardBox}>
        <View style={styles.listCardImageContainer}>
          <Image style={styles.listCardImage} source={{uri: api.imageUrl+props.image}} />
        </View>
        <View style={styles.titleBox}>
          <Text style={styles.dateLabel}>{props.location}</Text>
          <Text style={styles.titleLabel}>{props.name}</Text>
        </View>

        <View style={styles.shareOptions}>
          {/* <View style={styles.iconBox}>
          <Icon name="users" size={18} color="#444" />
          <Text style={{marginLeft:4}}>3</Text>
          </View> */}
          <View style={styles.iconBox}>

          <FontAwesome5Icon
              name="ticket-alt"
              color="#444"
              size={18}
              light />
            <Text style={{marginLeft:4}}>{props.seats}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  listCardBox: {
    marginVertical: 10,
    width: 200,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#000',
    marginHorizontal: 10,
    paddingBottom: 10,

    shadowOffset: {width: -2, height: 4},
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  listCardImage: {
    width: 200,
    height: 130,
    padding: 4,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  titleBox: {
    paddingHorizontal: 7,
    paddingTop: 10,
  },
  shareOptions: {
    flexDirection: 'row',
    paddingTop:15,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal:20,
    paddingBottom: 5,
  },
  dateLabel: {
    fontSize: 10,
    color: '#000',
    fontWeight: '500',
    opacity: 0.9,
  },
  titleLabel: {
    fontSize: 16,
    paddingTop: 5,
    color: '#000',
    fontWeight: 'bold',
  },
  iconBox:{
    flexDirection:'row', alignItems:'center'
  }
});
