import React from 'react';
import {api} from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from './authAction';

export const getAllGroups = async () => {
  let resData;

  var myHeaders = new Headers();

  var requestOptions = {
    method: 'GET',

    headers: myHeaders,
    redirect: 'follow',
  };

  resData = fetch(`${api.url}groups`, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => console.log('error', error));

  return resData;
};



export const getAllFilteredGroups = async (
  groupCat,
  groupDistance
) => {
  let resData, i, j;
  console.log("dta here", groupCat, groupDistance);

  var formdata = new FormData();
  for (i = 0; i < groupCat.length; i++) {
    formdata.append("group_category_ids[]", groupCat[i]);
    console.log("hhh", groupCat[i]);
  }
  for (j = 0; j < groupDistance.length; j++) {
    formdata.append("group_distance[]", groupDistance[j]);
    console.log("hhh", groupDistance[j]);
  }

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  await fetch(`${api.url}group/filters`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      resData = result;
    })
    .catch((error) => console.log("error", error));

  return resData;
};









export const createGroup = async (
  groupName,
  groupImage,
  groupLocation,
  groupLat,
  groupLong,
  groupCategory,
  groupDescription,
) => {
  let resData;
  console.log(
    "KKKKK",
    groupName,
    groupImage,
    groupLocation,
    groupLat,
    groupLong,
    groupCategory,
    groupDescription,
  );

  let a = await AsyncStorage.getItem("@token");
  let token = JSON.parse(a);
  let b = await AsyncStorage.getItem("@user");
  b = JSON.parse(b);
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer`+token
      );

  var formdata = new FormData();
formdata.append("group_name", groupName);
formdata.append("group_image", groupImage);
formdata.append("group_location", groupLocation);
formdata.append("group_description", groupDescription);
formdata.append("group_user_id", b.id);
formdata.append("group_category_id", groupCategory);
formdata.append("group_lat", groupLat);
formdata.append("group_long", groupLong);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

  await fetch(api.url + "group/create", requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      if (result?.status === 401) {
        logout();
      }
      resData = result;
      //  console.log("JKNJK", result);
    })
    .catch((error) => console.log("error", error));

  return resData;
};




export const updateGroup = async (
  id,
  groupName,
  groupImage,
  groupLocation,
  groupLat,
  groupLong,
  groupCategory,
  groupDescription,
) => {
  let resData;
  console.log(
    "KKKKK",
    groupName,
    groupImage,
    groupLocation,
    groupLat,
    groupLong,
    groupCategory,
    groupDescription,
  );

  let a = await AsyncStorage.getItem("@token");
  let token = JSON.parse(a);
  console.log("token",token);
  let b = await AsyncStorage.getItem("@user");
  b = JSON.parse(b);
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer`+token
      );

  var formdata = new FormData();
formdata.append("group_name", groupName);
formdata.append("group_image", groupImage);
formdata.append("group_location", groupLocation);
formdata.append("group_description", groupDescription);
formdata.append("group_user_id", b.id);
formdata.append("group_category_id", groupCategory);
formdata.append("group_lat", groupLat);
formdata.append("group_long", groupLong);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

  await fetch(api.url + `group/update/${id}`, requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      if (result?.status === 401) {
        logout();
      }
      resData = result;
      //  console.log("JKNJK", result);
    })
    .catch((error) => console.log("error", error));

  return resData;
};




export const getGroupById = async (id) => {

  let resData, requestOptions;
  let a = await AsyncStorage.getItem("@user");
    console.log("userr", a)
    let formdata = new FormData();

    if (a) {
      a = JSON.parse(a);
      formdata.append("user_id", a.id);
    }

    requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    console.log("fomr", formdata)

    await fetch(`${api.url}group/user/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("Group Detail", result);
      resData = result;
    })
    .catch((error) => console.log("error", error));

  return resData;
};











export const getAllRelatedGroups = async (id, cat) => {
  let resData;
  var formdata = new FormData();
  formdata.append("group_id", id);
  formdata.append("group_category_id", cat);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  resData = fetch(`${api.url}relatedgroups`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      // if (!(result.status === 200)) {
      //   return {
      //     status: 0,
      //     message: "Group data not found",
      //   };
      // }
      return result;
    })
    .catch((error) => console.log("error", error));

  return resData;
};


export const addBookmark = async (id) => {
  let resData, token;

  let b = await AsyncStorage.getItem("@user");
  if(b){

    b = JSON.parse(b);
  console.log("user", b.id)
  }


var a = await AsyncStorage.getItem("@token");
if(a){

   token = JSON.parse(a);
}
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer` + token);


  var formdata = new FormData();
  formdata.append("group_id", id);
  formdata.append("group_user_id", b.id);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };

  await fetch(`${api.url}profile/groupstore`, requestOptions)
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


export const removeBookmark = async (id) => {

  console.log("iDDD", id)
  let resData, token;

   var a = await AsyncStorage.getItem("@token");
   if(a){
     token = JSON.parse(a);
  }
  console.log("token",token);
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer`+token
      );

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  console.log("requestOptions", requestOptions)


  await fetch(`${api.url}profile/groupunsaved/${id}`, requestOptions)
  .then((response) => response.json())
  .then((result) => {

    console.log("HHHHHHHH", result);
    if (result?.status === 401) {
      logout();
    }
    resData = result;
  })
  .catch((error) => console.log("error", error));

  return resData;
};
