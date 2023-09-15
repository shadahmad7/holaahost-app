import React from 'react';
import {api} from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import { logout } from './authAction';

export const getTransactionRecords = async () => {
    let resData;
  
      var a = await AsyncStorage.getItem("@token");
    let token = JSON.parse(a);
    
    let b = await AsyncStorage.getItem("@user");
    b = JSON.parse(b);
  
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer` + token);
    myHeaders.append("Cookie", "mode=day");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
  
    await fetch(api.url + `get_transaction/${b.id}`, requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        if (result?.status === 401) {
          logout();
        }
        resData = result;
        console.log("res", resData);
      })
      .catch((error) => console.log("error", error));
  
    return resData;
  };
  


  export const makePayment = async () => {
    let resData, token;
    let c = await AsyncStorage.getItem("@joinGroup");
    console.log("hh", c)
    
    var a = await AsyncStorage.getItem("@token");
    console.log("hh", a)
    if(a){
      token = JSON.parse(a);
    }

    console.log("hh", token)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer` + token);
    myHeaders.append("Cookie", "mode=day");

    var formdata = new FormData();
    if (c) {
      console.log("Group");
      c = JSON.parse(c);
      console.log("group id", c);
      formdata.append("amount", "1500");
      formdata.append("desc", "Group Joining Fees");
    } else {
      console.log("Event");
      formdata.append("amount", "50000");
      formdata.append("desc", "Event Creation Fees");
    }

    console.log("reqqqqqqqqqq", formdata)


    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    console.log("reqqqqqqqqqq", requestOptions)

    await fetch(api.url + `checkout`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.status === 401) {
          logout();
        }
        resData = result;
      })
      .catch((error) => console.log("error", error));
  
    return resData;
  };






  export const sendTransactionRecordEvent = async (paymentIntent) => {
    let resData;
    var a = await AsyncStorage.getItem("@token");
    let token = JSON.parse(a);
    let b = await AsyncStorage.getItem("@user");
    b = JSON.parse(b);
    let c = await AsyncStorage.getItem("@createdEvent");
  if(c){

    c = JSON.parse(c);
  }
  
  
    console.log("Details to get event", a,b, c, paymentIntent)
    var myHeaders = new Headers();
    // myHeaders.append("Authorization", `Bearer` + token);
  
    var formdata = new FormData();
    formdata.append("customer_name", b.name);
    formdata.append("customer_email", b.email);
  
    
    formdata.append("item_price", paymentIntent.amount);
    formdata.append("paid_amount", paymentIntent.amount);
    formdata.append("txn_id", paymentIntent.id);
    formdata.append("payment_status", paymentIntent.status);
  
   
  
      formdata.append("group_id", "0");
      formdata.append("event_id", c.id);
      formdata.append("item_name", c.event_name);
  
    
    formdata.append("user_id", b.id);
    
  
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
  
  console.log("requestOptions", requestOptions)
  
    await fetch(api.url + `add_transaction`, requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        if (result?.status === 401) {
          logout();
        }
        resData = result;
        console.log("res", resData);
      })
      .catch((error) => console.log("error", error));
  
    
  
    return resData;
  };
  
  
  
  
  export const sendTransactionRecordGroup = async (paymentIntent) => {
    let resData;
   
    let b = await AsyncStorage.getItem("@user");
    b = JSON.parse(b);
  
    let d = await AsyncStorage.getItem("@joinGroup");
    d = JSON.parse(d);
  
    var myHeaders = new Headers();
    // myHeaders.append("Authorization", `Bearer` + token);
  
    var formdata = new FormData();
    formdata.append("customer_name", b.name);
    formdata.append("customer_email", b.email);
  
    
    formdata.append("item_price", paymentIntent.amount);
    formdata.append("paid_amount", paymentIntent.amount);
    formdata.append("txn_id", paymentIntent.id);
    formdata.append("payment_status", paymentIntent.status);
  
      formdata.append("group_id", d);
      formdata.append("event_id", "0");
      formdata.append("item_name", "Group Joining Fees");
  
  
  
    formdata.append("user_id", b.id);
    
  
  
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
  
    await fetch(api.url + `add_transaction`, requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        if (result?.status === 401) {
          logout();
        }
        resData = result;
        console.log("res", resData);
      })
      .catch((error) => console.log("error", error));
  
     
  
    return resData;
  };
  
  