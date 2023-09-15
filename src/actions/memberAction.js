
import React from 'react';
import {api} from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from './authAction';

export const getAllMembers = async (id) => {
    let resData;
    var myHeaders = new Headers();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
  
    await fetch(api.url + `group/members/${id}`, requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        resData = result;
        console.log("res members", resData);
        console.log("res members 2", resData.data);
      })
      .catch((error) => console.log("error", error));
  
    return resData;
  };





  export const becomeMember = async (id) => {
    let resData;
    var a = await AsyncStorage.getItem("@user");
    console.log("token", a);
    a = JSON.parse(a);
  
  
  
    var a = await AsyncStorage.getItem("@token");
    let token = JSON.parse(a);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer` + token);
  
    var formdata = new FormData();
    formdata.append("user_id", a.id);
    formdata.append("group_id", id);
  
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
  
    await fetch(api.url + `groupMembers/create`, requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        if (result?.status === 401) {
          logout();
        }
        resData = result;
        console.log("res members", resData);
      })
      .catch((error) => console.log("error", error));
  
    return resData;
  };
  
  export const removeMember = async (id, gId) => {
    let resData;
    var a = await AsyncStorage.getItem("@token");
    let token = JSON.parse(a);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer` + token);
    var formdata = new FormData();
    formdata.append("user_id", id);
    formdata.append("group_id", gId);
  
    var requestOptions = {
      method: "DELETE",
      body: formdata,
      headers: myHeaders,
      redirect: "follow",
    };
  
    await fetch(api.url + `groupMembers/delete/${id}`, requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        if (result?.status === 401) {
          logout();
        }
        resData = result;
        console.log("res members", resData);
      })
      .catch((error) => console.log("error", error));
  
    return resData;
  };
  
  
  
  
  
  
  
  export const leaveGroupByUser = async (id) => {
    let resData;
    var a = await AsyncStorage.getItem("@token");
    let token = JSON.parse(a);
    let b = await AsyncStorage.getItem("@user");
    b = JSON.parse(b);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer` + token);
  
  
    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };
  
    await fetch(api.url + `groupMembers/delete/${id}`, requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        if (result?.status === 401) {
          logout();
        }
        resData = result;
        console.log("res members", resData);
      })
      .catch((error) => console.log("error", error));
  
    return resData;
  };
  


  