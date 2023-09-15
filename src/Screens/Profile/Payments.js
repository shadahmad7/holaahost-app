//import liraries
import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {getTransactionRecords} from '../../actions/paymentAction';
import colors from '../../constants/colors';

// create a component

const historyData = [
  {
    id: 1,
    title: 'Group Joining Fees',
    txnId: 'pi_785683fb57',
    amount: 50,
    status: 'Succeeded',
  },
  {
    id: 2,
    title: 'Group Joining Fees',
    txnId: 'pi_785683fb57',
    amount: 50,
    status: 'Succeeded',
  },
  {
    id: 3,
    title: 'Group Joining Fees',
    txnId: 'pi_785683fb57',
    amount: 50,
    status: 'Succeeded',
  },
  {
    id: 4,
    title: 'Group Joining Fees',
    txnId: 'pi_785683fb57',
    amount: 50,
    status: 'In Progress',
  },
  {
    id: 5,
    title: 'Group Joining Fees',
    txnId: 'pi_785683fb57',
    amount: 50,
    status: 'Failed',
  },
];
const Payments = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [loader, setLoader] = useState(true);

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoader(true);
    let action = await getTransactionRecords();
    console.log('actionnnnn', action);

    setPaymentData(action?.data);
    // console.log('dataaa', data);

    setTimeout(() => {
      setLoader(false);
    }, 2000);
  };

  return (
    <>
    {!loader ? ( 
      <View style={styles.container}>
      <Text
        style={{
          fontSize: 18,
          marginVertical: 10,
          fontWeight: '700',
          marginLeft: 20,
        }}>
        Transactions History
      </Text>
      <ScrollView>
        {paymentData.map((his, index) => (
          <View
          key={index}
            style={{
              borderWidth: 0.3,
              marginVertical: 10,
              marginHorizontal: 20,
              borderRadius: 10,
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            <Text style={{fontSize: 14, marginVertical: 4, fontWeight: '300'}}>
              {his.txn_id}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{fontSize: 16, marginVertical: 4, fontWeight: '700'}}>
                {his.item_name}
              </Text>
              <Text
                style={{fontSize: 15, marginVertical: 4, fontWeight: '500'}}>
                ₹{his.paid_amount}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 16,
                color:
                  his.payment_status === 'succeeded'
                    ? 'green'
                    : his.status === 'failed'
                    ? 'red'
                    : '#DFAE00',
                marginVertical: 4,
                fontWeight: '700',
              }}>
              {his.payment_status}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
    ):(
      <View style={{justifyContent:"center", flex:1,  alignItems:'center'}}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
    )}
      
    </>
  
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default Payments;
