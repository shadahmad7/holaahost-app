import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const data = [
  { groupName: 'Group 1', groupFollowers: '100', badge: 'Gold', paymentStatus: 'Paid' },
  { groupName: 'Group 2', groupFollowers: '200', badge: 'Silver', paymentStatus: 'Unpaid' },
  { groupName: 'Group 3', groupFollowers: '300', badge: 'Bronze', paymentStatus: 'Paid' },
  { groupName: 'Group 4', groupFollowers: '400', badge: 'Platinum', paymentStatus: 'Unpaid' },
];

const Achievement = () => {
  return (
    <View style={styles.tableContainer}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Group Name</Text>
        <Text style={styles.headerText}>Group Followers</Text>
        <Text style={styles.headerText}>Badge</Text>
        <Text style={styles.headerText}>Payment Status</Text>
      </View>
      {data.map((row, index) => (
        <View key={index} style={styles.dataRow}>
          <Text style={styles.dataText}>{row.groupName}</Text>
          <Text style={styles.dataText}>{row.groupFollowers}</Text>
          <Text style={styles.dataText}>{row.badge}</Text>
          <Text style={styles.dataText}>{row.paymentStatus}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    borderWidth: 1,
    borderColor: 'black',
    margin: 10,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#ddd',
  },
  headerText: {
    padding: 10,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: 'black',
  },
  dataRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'black',
  },
  dataText: {
    padding: 10,
    flex: 1,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: 'black',
  },
});
//make this component available to the app
export default Achievement;
