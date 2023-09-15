import React from 'react';
import {api} from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';


export const loginAction = async (email, password) => {
  let resData;
  console.log('KKKKK', email, password);
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Cookie', 'mode=day');

  var raw = JSON.stringify({
    email,
    password,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  await fetch(api.url + 'api/login', requestOptions)
    .then(response => response.json())
    .then(async result => {
      resData = result;
      if (resData.status === 200) {
        await AsyncStorage.setItem(
          '@token',
          JSON.stringify(resData.access_token),
        );
        await AsyncStorage.setItem('@user', JSON.stringify(resData.user));
      }
    })
    .catch(error => console.log('error', error));

  return resData;
};

export const registerAction = async (
  name,
  email,
  password,
  photoUrl,
  social,
) => {
  let resData;
  console.log('NEWWWW', name, email, password, photoUrl, social);
  var myHeaders = new Headers();
  myHeaders.append('Cookie', 'mode=day');

  var formdata = new FormData();
  formdata.append('email', email);
  formdata.append('password', password);
  formdata.append('name', name);
  formdata.append('photoUrl', photoUrl);
  formdata.append('social', social);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  };

  await fetch(api.url + 'api/register', requestOptions)
    .then(response => response.json())
    .then(async result => {
      console.log('Register', result);

      resData = result;
    })
    .catch(error => console.log('error', error));

  return resData;
};

export const forgotPassword = async email => {
  let resData;
  var myHeaders = new Headers();
  myHeaders.append('Cookie', 'mode=day');

  var formdata = new FormData();
  formdata.append('email', email);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  };

  await fetch(api.url + `password/email`, requestOptions)
    .then(response => response.json())
    .then(async result => {
      resData = result;
    })
    .catch(error => console.log('error', error));

  return resData;
};





export const socialLoginAction = async (email, social) => {
  let resData;
  console.log("KKKKK", email, social);
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "mode=day");
  
  var formdata = new FormData();
  formdata.append("email", email);
  formdata.append("social", social);
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };

  await fetch(api.url + "api/social_login", requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      resData = result
      if (resData.status === 200) {
        await AsyncStorage.setItem("@token",JSON.stringify(resData.access_token));
        await AsyncStorage.setItem("@user", JSON.stringify(resData.user));
      }
    })
    .catch((error) => console.log("error", error));

  return resData;
};








export const logout = async () => {
  AsyncStorage.removeItem("@token");
  AsyncStorage.removeItem("@user");
  AsyncStorage.removeItem("@firebaseUser");
  AsyncStorage.removeItem("@chatUser");
  AsyncStorage.removeItem("@createdEvent");
  AsyncStorage.removeItem("@joinGroup");
  RNRestart.restart();

};


