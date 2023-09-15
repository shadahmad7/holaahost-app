import React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../../constants/colors';

import {ScrollView} from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';

export default function SeachLocationScreen() {

  const [search, setSearch] = React.useState("Pune Camp India");
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          {/* Search Icon */}
          <View style={styles.searchSection}>
            <FontAwesome5Icon
              style={styles.searchIcon}
              name="arrow-left"
              size={20}
              color="#2a2a2a"
              onPress={() => navigation.goBack(null)}
            />
            <TextInput
              style={styles.input}
              placeholder="Search events"
              onChangeText={search => setSearch(search)}
              underlineColorAndroid="transparent"
            />
          </View>
       
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchSection: {
    marginVertical: 7,
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,

    paddingRight: 10,

    paddingBottom: 10,
    paddingLeft: 5,
    backgroundColor: '#fff',
    color: '#424242',
  },

  
});
