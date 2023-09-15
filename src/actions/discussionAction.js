import React from 'react';
import {api} from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import {logout} from './authAction';

export const getAllComments = async id => {
  let resData, url;

  var b = await AsyncStorage.getItem('@user');
  if (b) {
    b = JSON.parse(b);
    console.log('IDD', id, b.id);
    url = `comments/${id}/${b.id}`;
  } else {
    url = `comments/${id}/0`;
  }

  console.log('url', url);
  var myHeaders = new Headers();

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  await fetch(api.url + `${url}`, requestOptions)
    .then(response => response.json())
    .then(async result => {
      resData = result;
      console.log('res comments', resData);
    })
    .catch(error => console.log('error', error));

  return resData;
};

export const addComment = async (comment, group_id) => {
  let resData, token;
  var a = await AsyncStorage.getItem('@token');
  var b = await AsyncStorage.getItem('@user');
  if (b) {
    b = JSON.parse(b);
  }
  if (a) {
    token = JSON.parse(a);
  }

  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer` + token);

  var formdata = new FormData();
  formdata.append('comment', comment);
  formdata.append('user_id', b.id);
  formdata.append('group_id', group_id);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  };

  await fetch(api.url + `comment/create`, requestOptions)
    .then(response => response.json())
    .then(async result => {
      if (result?.status === 401) {
        logout();
      }
      resData = result;
      console.log('res comments', resData);
    })
    .catch(error => console.log('error', error));

  return resData;
};

export const deleteComment = async id => {
  let resData, token;
  var a = await AsyncStorage.getItem('@token');
  if (a) {
    token = JSON.parse(a);
  }
  var b = await AsyncStorage.getItem('@user');
  if (b) {
    b = JSON.parse(b);
  }

  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer` + token);

  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow',
  };

  await fetch(api.url + `comment/delete/${id}`, requestOptions)
    .then(response => response.json())
    .then(async result => {
      if (result?.status === 401) {
        logout();
      }
      resData = result;
      console.log('res comments', resData);
    })
    .catch(error => console.log('error', error));

  return resData;
};

export const likeComment = async id => {
    console.log("HEREEE LIKE")

  let resData, token;

  var a = await AsyncStorage.getItem('@token');
  if (a) {
    token = await JSON.parse(a);
  }

  var b = await AsyncStorage.getItem('@user');
  if (b) {
    b = await JSON.parse(b);
  }

  console.log('KKKKK', a, b, id);
  let userId = b.id;

  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer` + token);

  myHeaders.append('Cookie', 'mode=day');

  var formdata = new FormData();
  formdata.append('user_id', userId);
  formdata.append('comment_id', id);

  console.log('KKKKK', formdata);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  }

  await fetch(api.url+`comment/likes/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log('HEREEEE', result);
      if (result?.status === 401) {
        console.log('HEREEEE');
        logout();
      }
      resData = result;
      console.log('res comments', resData);
    })
    .catch(error => console.log('error', error));

  return resData;
};

export const unlikeComment = async id => {
    console.log("HEREEE UNLIKE")
  let resData, token;
  var a = await AsyncStorage.getItem('@token');
  if (a) {
    token = JSON.parse(a);
  }
  var b = await AsyncStorage.getItem('@user');
  if (b) {
    b = JSON.parse(b);
    console.log('user', b.id);
  }

  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer` + token);

  var formdata = new FormData();
  formdata.append('user_id', b.id);
  formdata.append('comment_id', id);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    headers: myHeaders,
    redirect: 'follow',
  };

  await fetch(api.url + `comment/unlikes`, requestOptions)
    .then(response => response.json())
    .then(async result => {
      if (result?.status === 401) {
        logout();
      }
      resData = result;
      console.log('res comments', resData);
    })
    .catch(error => console.log('error', error));

  return resData;
};

export const addCommentReply = async (id, comment, group_id) => {
  let resData;
  var a = await AsyncStorage.getItem('@token');
  var b = await AsyncStorage.getItem('@user');
  let token = JSON.parse(a);
  b = JSON.parse(b);

  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer` + token);

  var formdata = new FormData();
  formdata.append('comment', comment);
  formdata.append('user_id', b.id);
  formdata.append('group_id', group_id);
  formdata.append('parent_comment_id', id);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  };

  await fetch(api.url + `comment/reply?comment`, requestOptions)
    .then(response => response.json())
    .then(async result => {
      if (result?.status === 401) {
        logout();
      }
      resData = result;
      console.log('res comments', resData);
    })
    .catch(error => console.log('error', error));

  return resData;
};

export const updateComment = async (id, comment, group_id) => {
  let resData;
  var a = await AsyncStorage.getItem('@token');
  var b = await AsyncStorage.getItem('@user');
  console.log('token', a);

  let token = JSON.parse(a);
  b = JSON.parse(b);

  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer` + token);

  myHeaders.append('Cookie', 'mode=day');

  var formdata = new FormData();
  formdata.append('comment', comment);
  formdata.append('user_id', b.id);
  formdata.append('group_id', group_id);
  formdata.append('comment_id', id);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  };

  await fetch(api.url + `comment/update/${id}`, requestOptions)
    .then(response => response.json())
    .then(async result => {
      if (result?.status === 401) {
        logout();
      }
      resData = result;
      console.log('res comments', resData);
    })
    .catch(error => console.log('error', error));

  return resData;
};

export const updateCommentReply = async (id, comment, group_id) => {
  let resData;
  var a = await AsyncStorage.getItem('@token');
  var b = await AsyncStorage.getItem('@user');

  let token = JSON.parse(a);
  b = JSON.parse(b);

  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer` + token);
  myHeaders.append('Cookie', 'mode=day');

  var formdata = new FormData();
  formdata.append('comment', comment);
  formdata.append('user_id', b.id);
  formdata.append('group_id', group_id);
  formdata.append('comment_id', id);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  };

  await fetch(api.url + `comment/reply/update/${id}`, requestOptions)
    .then(response => response.json())
    .then(async result => {
      if (result?.status === 401) {
        logout();
      }
      resData = result;
      console.log('res comments', resData);
    })
    .catch(error => console.log('error', error));

  return resData;
};
