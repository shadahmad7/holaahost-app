

import React from 'react';
import {api} from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import { logout } from './authAction';






export const addNewBank = async (bankName, bankAccountNumber, ifscCode) => {
    let resData, token;
    var a = await AsyncStorage.getItem("@token");
    if(a){
        token = JSON.parse(a);
    }
    let b = await AsyncStorage.getItem("@user");
    if(b){
      b = JSON.parse(b);
    }
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer` + token);
    myHeaders.append("Cookie", "mode=day");

    var formdata = new FormData();
    formdata.append("bank_name", bankName);
    formdata.append("account_number", bankAccountNumber);
    formdata.append("ifsc_code", ifscCode);
    formdata.append("user_id", b.id);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

  await fetch(`${api.url}add_bank`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      resData = result;
      console.log("resss add bank", result);
    })
    .catch((error) => console.log("error", error));

  return resData;
};



export const checkBank = async () => {
    let resData, token;
    var a = await AsyncStorage.getItem("@token");
    if(a){
        token = JSON.parse(a);
    }
    let b = await AsyncStorage.getItem("@user");
    if(b){
      b = JSON.parse(b);
    }

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer` + token);
    myHeaders.append("Cookie", "mode=day");

    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
   
      redirect: 'follow'
    };

  await fetch(`${api.url}bankdetail/${b.id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
        if(result?.status === 401){
            logout();
          }
       resData = result;
       console.log("resss get bank", result);
    })
    .catch((error) => console.log("error", error));

  return resData;
};






export const updateMyBank = async (bankName, bankAccountNumber, ifscCode, id) => {
    let resData, token;
    var a = await AsyncStorage.getItem("@token");
    if(a){
        token = JSON.parse(a);
    }
    let b = await AsyncStorage.getItem("@user");
    if(b){
      b = JSON.parse(b);
    }
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer` + token);
    myHeaders.append("Cookie", "mode=day");

    var formdata = new FormData();
    formdata.append("bank_name", bankName);
    formdata.append("account_number", bankAccountNumber);
    formdata.append("ifsc_code", ifscCode);
    formdata.append("user_id", b.id);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

  await fetch(`${api.url}bank/update/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      resData = result;
      console.log("resss add bank", result);
    })
    .catch((error) => console.log("error", error));

  return resData;
};