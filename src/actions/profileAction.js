
import React from 'react';
import {api} from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from './authAction';

export const searchGlobal = async (word) => {
    let resData;
  
    var formdata = new FormData();
    formdata.append("search", word);
  
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
  
    await fetch(api.url + `search`, requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        resData = result;
      })
      .catch((error) => console.log("error", error));
  
    return resData;
  };


  export const myProfile = async () => {
    let resData;
  
    var a = await AsyncStorage.getItem("@token");
    console.log("kmks", a)

    let token =  JSON.parse(a);

    console.log("kmks", token)
  
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer` + token);
  
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
  
    await fetch(api.url + "api/me", requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        if (result?.status === 401) {
          logout();
        }
        resData = result;
      })
      .catch((error) => console.log("error", error));
  
    return resData;
  };





  export const updateProfile = async (
    name,
    bio,
    facebook,
    instagram,
    twitter,
    youtube
  ) => {
    let resData;
  
    var a = await AsyncStorage.getItem("@token");
    let token = JSON.parse(a);
    let b = await AsyncStorage.getItem("@user");
    b = JSON.parse(b);
  
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer` + token);
  
    myHeaders.append("Cookie", "mode=day");
  
    var formdata = new FormData();
    formdata.append("name", name);
    formdata.append("bio", bio);
    formdata.append("facebook_link", facebook);
    formdata.append("instagram_link", instagram);
    formdata.append("twitter", twitter);
    formdata.append("youtube", youtube);
  
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
  
    await fetch(api.url + `update-profile/${b.id}`, requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        if (result?.status === 401) {
          logout();
        }
        resData = result;
      })
      .catch((error) => console.log("error", error));
  
    return resData;
  };




  export const updateProfilePIc = async (image) => {
    let resData;

    console.log("Helllo ",image)
  
    var a = await AsyncStorage.getItem("@token");
    let token =  JSON.parse(a);
    let b = await AsyncStorage.getItem("@user");
    b = JSON.parse(b);
  
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer` + token);
  
    myHeaders.append("Cookie", "mode=day");
  
    var formdata = new FormData();
    formdata.append("photoUrl", image);
  
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
  
    await fetch(api.url + `update-profileimage/${b.id}`, requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        if (result?.status === 401) {
          logout();
        }
        resData = result;
        result = result.data;
        console.log("dataat", resData);
        let obj = {
          id: result.id,
          name: result.name,
          email: result.email,
          photoUrl: result.photoUrl,
          social: result.social,
        };
        console.log("ddddddd", obj);
        await AsyncStorage.setItem("@user", JSON.stringify(obj));
      })
      .catch((error) => console.log("error", error));
  
    return resData;
  };





  export const updatePassword = async (oldPass, newPass) => {
    let resData;
  
    var a = await AsyncStorage.getItem("@token");
    let token = JSON.parse(a);
    let b = await AsyncStorage.getItem("@user");
    b = JSON.parse(b);
  
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer` + token);
  
    var formdata = new FormData();
    formdata.append("old_password", oldPass);
    formdata.append("new_password", newPass);
    formdata.append("id", b.id);
  
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
  
    await fetch(api.url + `profile/changepassword`, requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        if (result?.status === 401) {
          logout();
        }
        resData = result;
      })
      .catch((error) => console.log("error", error));
  
    return resData;
  };














  export const myGroups = async () => {
    let resData;
  
    let b = await AsyncStorage.getItem("@user");
    b = JSON.parse(b);
  
    var a = await AsyncStorage.getItem("@token");
    let token = JSON.parse(a);
    
  
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer` + token);
  
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    await fetch(api.url + `group-by-user/${b.id}`, requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        if (result?.status === 401) {
          logout();
        }
        resData = result;
      })
      .catch((error) => console.log("error", error));
  
    return resData;
  };
  
  export const myEvents = async () => {
    let resData;
  
    let b = await AsyncStorage.getItem("@user");
    b = JSON.parse(b);
  
    var a = await AsyncStorage.getItem("@token");
    let token = JSON.parse(a);
  
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer` + token);
  
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    await fetch(api.url + `event-by-user/${b.id}`, requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        if (result?.status === 401) {
          logout();
        }
        resData = result;
      })
      .catch((error) => console.log("error", error));
  
    return resData;
  };
  
  export const savedGroups = async () => {
    let resData;
  
    let b = await AsyncStorage.getItem("@user");
    b = JSON.parse(b);
  
    var a = await AsyncStorage.getItem("@token");
    let token = JSON.parse(a);


    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer` + token);
  
    var formdata = new FormData();
  
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
     
      redirect: "follow",
    };
  
    await fetch(api.url + `profile/savedgroup/${b.id}`, requestOptions)
      .then((response) => response.json())
      .then(async(result) => {
        if (result?.status === 401) {
          logout();
        }
        resData = result;
      })
      .catch((error) => console.log("error", error));
  
    return resData;
  };
  


  export const savedEvents = async () => {
    let resData;
  
     let b = await AsyncStorage.getItem("@user");
    b = JSON.parse(b);
  
    var a = await AsyncStorage.getItem("@token");
    let token = JSON.parse(a);



    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer` + token);
  
    var formdata = new FormData();
  
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
    
      redirect: "follow",
    };
  
    await fetch(api.url + `profile/eventsaved/${b.id}`, requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        if (result?.status === 401) {
          logout();
        }
        resData = result;
      })
      .catch((error) => console.log("error", error));
  
    return resData;
  };