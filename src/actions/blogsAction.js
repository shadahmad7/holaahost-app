


import React from 'react';
import {api} from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import { logout } from './authAction';


export const getAllBlogs = async (id) => {
    let resData;
    var myHeaders = new Headers();
    console.log("token",myHeaders);
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  await fetch(api.url + `group/blogs/${id}`, requestOptions)
  .then((response) => response.json())
  .then(async (result) => {
    resData = result;
    console.log("res blog", resData);
  })
  .catch((error) => console.log("error", error));
  
    return resData;
  };








  export const blogById = async (id) => {
    let resData;
    var a = await AsyncStorage.getItem("@token");
    let token = JSON.parse(a);
     
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "mode=day");
    
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    await fetch(api.url+`blog/${id}`, requestOptions)
    .then(response => response.json())
    .then(result =>{
    if(result?.status === 401){
      logout();
    }
    resData = result;
    console.log("res blog", resData);
  })
  .catch((error) => console.log("error", error));
  
    return resData;
  };
  











  export const createBlog = async (id, blog, title, image) => {
    let resData;
    var a = await AsyncStorage.getItem("@token");
    let token = JSON.parse(a);
     
    var myHeaders = new Headers();
      myHeaders.append(
      "Authorization",
      `Bearer`+token
    );
  myHeaders.append("Cookie", "mode=day");
  
  var formdata = new FormData();
  formdata.append("blog_title", title);
  formdata.append("blog_desc", blog);
  formdata.append("group_id", id);
  formdata.append("blog_image", image);
  
  
    console.log("token",myHeaders);
  
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
  
  
  await fetch(api.url + `/blog/create`, requestOptions)
  .then((response) => response.json())
  .then(async (result) => {
    if(result?.status === 401){
      logout();
    }
    resData = result;
    console.log("res blog", resData);
  })
  .catch((error) => console.log("error", error));
  
    return resData;
  };
  









  
  
  export const deleteBlog = async (id) => {
    let resData;
    var a = await AsyncStorage.getItem("@token");
    let token = JSON.parse(a);
  
  
    var myHeaders = new Headers();
    myHeaders.append(
    "Authorization",
    `Bearer`+token
  );
  
  
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };
    
  
  await fetch(api.url + `blog/delete/${id}`, requestOptions)
  .then((response) => response.json())
  .then(async (result) => {
    if(result?.status === 401){
      logout();
    }
    resData = result;
    console.log("res del blog", resData);
  })
  .catch((error) => console.log("error", error));
  
    return resData;
  };




  