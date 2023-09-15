import React from 'react';
import {api} from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';


export const getAllAttendees = async (id) => {
    console.log("event id", id);
    let resData;
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    await fetch(`${api.url}event/attendees/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        resData = result;
        console.log("resss", result);
      })
      .catch((error) => console.log("error", error));
  
    return resData;
  };
  
  
  
  
  
  export const getAllRequestedAttendees = async (id) => {
    console.log("id", id);
  
    let resData;
    var a = await AsyncStorage.getItem("@token");
    let token = await JSON.parse(a);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer` + token);
    myHeaders.append("Cookie", "mode=day");
  
  
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
  
  
    await fetch(`${api.url}event/pendingattendees/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        resData = result;
        console.log("resss", result);
        if(result?.status === 401){
          logout();
        }
      })
      .catch((error) => console.log("error", error));
  
    return resData;
  };
  
  
  //Used to accept request of event claims
  
  
  export const acceptRequest = async (id) => {
    console.log("id", id);
  
    let resData;
    var a = await AsyncStorage.getItem("@token");
    let token = await JSON.parse(a);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer` + token);
    myHeaders.append("Cookie", "mode=day");
  
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    await fetch(`${api.url}event/acceptattendess/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        resData = result;
        if(result?.status === 401){
          logout();
        }
        console.log("resss", result);
      })
      .catch((error) => console.log("error", error));
  
    return resData;
  };
  
  //Used to delet request of event 
  
  export const rejectRequest = async (id) => {
    console.log("id", id);
    let resData;
    var a = await AsyncStorage.getItem("@token");
    let token = await JSON.parse(a);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer` + token);
    myHeaders.append("Cookie", "mode=day");
  
    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };
  
    await fetch(`${api.url}attendees/delete/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        resData = result;
        if(result?.status === 401){
          logout();
        }
        console.log("resss", result);
      })
      .catch((error) => console.log("error", error));
  
    return resData;
  };
  
  
  
  
  //Used to claim for the seat
  
  
  export const claimRequest = async (id) => {
    console.log("id", id);
  
    let resData, token;
  
    var a = await AsyncStorage.getItem("@token");
    if(a){
         token = await JSON.parse(a);
    }else{
      a=0;
    }
   
    let b = await AsyncStorage.getItem("@user");
    if(b){
      b = JSON.parse(b);
    }else {
      b=0;
    }
  
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer` + token);
    myHeaders.append("Cookie", "mode=day");
  
    var formdata = new FormData();
    formdata.append("attendees_role", "Staff");
    formdata.append("attendees_user_id", b.id);
    formdata.append("attendees_event_id", id);
  
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
  
    await fetch(`${api.url}attendees/create`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if(result?.status === 401){
          logout();
        }
        resData = result;
        console.log("resss", result);
      })
      .catch((error) => console.log("error", error));
  
    return resData;
  };
  