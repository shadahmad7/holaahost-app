import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {useStripe} from '@stripe/stripe-react-native';
import React, {useState} from 'react';
import {View, Text, TextInput, Button, Alert, Image, ActivityIndicator, TouchableOpacity} from 'react-native';
import {
  makePayment,
  sendTransactionRecordEvent,
  sendTransactionRecordGroup,
} from '../../actions/paymentAction';
import {api} from '../../config/api';
import colors from '../../constants/colors';

const PaymentScreen = () => {
  const [name, setName] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const [loader, setLoader] = useState(false);
  const [start, setStart] = useState(false);
  const [group, setGroup] = useState(false);

const navigation = useNavigation();


  React.useEffect(() => {
  

      loadAll();
   
  }, []);



  const loadAll = async()=> {
    setLoader(true);

    let gId  = await AsyncStorage.getItem("@joinGroup")
    if(gId){
      setGroup(true);
    }
    setTimeout(async()=> {
      setLoader(false);
    },2000)
  }



  const subscribe = async () => {
    setStart(true);
    console.log('heree');
    try {
      // sending request
      console.log('heree');
      let makePaymentRes = await makePayment();
      console.log('hskss', makePaymentRes);
      console.log('hskss', makePaymentRes.clientSecret);
      setClientSecret(makePaymentRes.clientSecret);
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        googlePay: true,
        merchantDisplayName: 'Shad Ahmad',
      });
      if (initSheet.error) return Alert.alert(initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });
      if (presentSheet.error) {
        console.log('LLL', presentSheet.error.message);
        Alert.alert(presentSheet.error.message);
        let paymentDetail = {
          amount: makePaymentRes.id.amount,
          id: makePaymentRes.id.id,
          status: 'failed',
        };
        sendTransactions(paymentDetail);
      } else {
        Alert.alert('Payment complete, thank you!');
        let paymentDetail = {
          amount: makePaymentRes.id.amount,
          id: makePaymentRes.id.id,
          status: 'succeeded',
        };
        sendTransactions(paymentDetail);
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Something went wrong, try again later!');
    }
  };

  const sendTransactions = async paymentDetail => {
    let c = await AsyncStorage.getItem('@joinGroup');
    if (c) {
      c = JSON.parse(c);
      hittApiGroup(paymentDetail, c);
    } else {
      hittApiEvent(paymentDetail);
    }
  };

  const hittApiEvent = async paymentt => {
    console.log('EVENT CREATING');
    let action = await sendTransactionRecordEvent(paymentt);
    console.log('acionnnnnnnn create event', action);
    setTimeout(async () => {
      await AsyncStorage.removeItem('@createdEvent');
      await AsyncStorage.removeItem('@joinGroup');
      navigation.navigate("Events");
    }, 2000);

    
  };

  const hittApiGroup = async (paymentt, c) => {
    console.log('JOINNGGG GROUPPPP');

    let action = await sendTransactionRecordGroup(paymentt);
    console.log('acionnnnnnnn group join', action);
    // let joinRes = await becomeMember(c);
    // console.log("rs join", joinRes);
    setTimeout(async () => {
      await AsyncStorage.removeItem('@createdEvent');
      await AsyncStorage.removeItem('@joinGroup');
      navigation.navigate("Groups");

    }, 2000);
  };

  return (
    <>
    {!loader ? (

    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>


{group ? (
  <View>
      <Text style={{
            fontSize: 18,
            fontWeight: '700',
            textAlign: 'center',
            marginTop: 10,
          }}>Group Joining Fees</Text>
      <Text style={{
            fontSize: 18,
            fontWeight: '700',
            textAlign: 'center',
            marginTop: 10,
          }}>Amount to pay : 15</Text>
          <TouchableOpacity onPress={subscribe} style={{paddingHorizontal:10,borderWidth:0.4, borderRadius:5, backgroundColor:"red", marginVertical:10, alignItems:"center",  paddingVertical:10, }}>
            <Text style={{color:'#fff'}}>Pay Now</Text>
          </TouchableOpacity>
    </View>
):(
  <View>
      <Text style={{
            fontSize: 18,
            fontWeight: '700',
            textAlign: 'center',
            marginTop: 10,
          }}>Event Creation</Text>
      <Text style={{
            fontSize: 18,
            fontWeight: '700',
            textAlign: 'center',
            marginTop: 10,
          }}>Amount to pay : 500</Text>
          <TouchableOpacity onPress={subscribe} style={{paddingHorizontal:10,borderWidth:0.4, borderRadius:5, backgroundColor:"red", marginVertical:10, alignItems:"center",  paddingVertical:10, }}>
            <Text style={{color:'#fff'}}>Pay Now</Text>
          </TouchableOpacity>
    </View>
)}

   






    {start && (

    <>
    {paymentStatus === '' && (
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            textAlign: 'center',
            marginTop: 10,
          }}>
          Please don't close, till payment complete.
          If popup don't show, please retry.
        </Text>
      )}

      {paymentStatus === 'succeeded' && (
        <Image
          source={{uri: api.imageUrl + 'check.png'}}
          style={{width: 100, height: 100}}
        />
      )}

      {paymentStatus === 'failed' && (
        <Image
          source={{uri: api.imageUrl + 'close.png'}}
          style={{width: 100, height: 100}}
        />
      )}
    </>
)}


    
    </View>
    ):(
      <View
          style={{
            flex: 1,

            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
    )}

    </>
  );
};

export default PaymentScreen;
