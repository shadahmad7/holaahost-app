import {useNavigation} from '@react-navigation/core';
import React from 'react';
import { View, StyleSheet, ActivityIndicator} from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import colors from '../../constants/colors';
import FloatingLabelTextInput from '../../Components/FloatingLabelTextInput';
import Button from '../../Components/Button';
import Toast from 'react-native-simple-toast';
import { addNewBank, checkBank, updateMyBank } from '../../actions/bankAction';

export default function BankAccount() {

  const navigation = useNavigation();


  const [bankData, setBankData] = React.useState({});
  const [bankName, setBankName] = React.useState("");
  const [accountNumber, setAccountNumber] = React.useState("");
  const [ifsc, setIfsc] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const [bank, setBank] = React.useState(false);

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoader(true)
    let action = await checkBank();
    if (action.data.length > 0) {
      action = action.data[0];
      setBankData(action);
      setBank(true);
      console.log("actionssssssssss", action);

      setBankName(action.bank_name);
      setAccountNumber(action.account_number);
      setIfsc(action.ifsc_code);
    }
    console.log("WWWWWWWWWWW", bankName, accountNumber, ifsc)

    setTimeout(()=> {
      setLoader(false)

    },2000)

  };

  const onSubmit = async (e) => {
    
    setLoader(true);
    let bankRes;
    console.log("datataaa", bankName, accountNumber, ifsc)
    if(!bankName) {
      Toast.show('Please enter bank name', Toast.LONG);
    }else if (!accountNumber) {
      Toast.show('Please enter bank account number', Toast.LONG);

    }else if (!ifsc ) {
      Toast.show('Please enter IFSC Code', Toast.LONG);

    }else {
      if(bank){
        bankRes= await updateMyBank(bankName, accountNumber, ifsc, bankData?.id);
        if (bankRes.status === 200) {
          console.log("new bank Updated", bankRes);
          Toast.show('Bank Account Updated Successfully!', Toast.LONG);

        
        }
      } else {
         bankRes = await addNewBank(bankName, accountNumber, ifsc);
         if (bankRes.status === 200) {
          console.log("new bank added", bankRes);
          Toast.show('Bank Account Added Successfully!', Toast.LONG);
        }
      }
      setTimeout(() => {
        setLoader(false);
      }, 2000);
    }
  };


  








  return (
    <>
    {!loader ? (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
   

        <View style={{marginHorizontal:-10}}>
        <FloatingLabelTextInput  title="Bank Name" defaultValue={bankName} secureTextEntry={false}  onChangeText={(text)=> setBankName(text)} />
          <FloatingLabelTextInput title="Account Number" defaultValue={accountNumber} secureTextEntry={false}  onChangeText={(text)=> setAccountNumber(text)} />
          <FloatingLabelTextInput title="IFSC Code" defaultValue={ifsc} secureTextEntry={false} onChangeText={(text)=> setIfsc(text)} />
        
        </View>
        <View style={{marginVertical:20}}>
        <Button
          title={bank ? "Update": "Add"}
          style={[styles.loginButton, styles.loginButtonText]}
          onPress={() => onSubmit()}
        />
        </View>
       
 
     
      </ScrollView>
    </View>
    ):(
      <View
          style={{
            flex: 1,
            // marginTop: '50%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
    )}
 
    </>
   
  );
}

const styles = StyleSheet.create({
  bioSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  
  image: {
    width: 120,
    borderRadius: 100,
    height: 120,
    marginBottom: 5,
  },
  email: {
    marginBottom: 8,
    fontSize: 16,

    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: colors.primary,
    marginVertical:20,
    width: '70%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  loginButtonText: {
    color: '#fff',
    alignItems: 'center',
  },
 
});
