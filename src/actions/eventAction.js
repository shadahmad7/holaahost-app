import React from 'react';
import {api} from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from './authAction';

export const getAllEvents = async () => {
  let resData;
  const url = `${api.url}events`;

  let response = await fetch(url);

  resData = response.json();

  console.log('Event', resData);
  return resData;
};


export const getAllFilteredEvents = async (
  eventCat,
  eventDay,
  eventDistance,
  eventType
) => {
  let resData, i, j, k, l;
  console.log("data here", eventCat, eventDay, eventDistance, eventType);

  var formdata = new FormData();
  for (i = 0; i < eventCat.length; i++) {
    formdata.append("event_category_ids[]", eventCat[i]);
  }
  for (j = 0; j < eventDay.length; j++) {
    formdata.append("day[]", eventDay[j]);
  }
  for (k = 0; k < eventType.length; k++) {
    formdata.append("event_type[]", eventType[k]);
  }
  for (l = 0; l < eventDistance.length; l++) {
    formdata.append("event_distance[]", eventDistance[l]);
  }

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  await fetch(`${api.url}event/filters`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      resData = result;
    })
    .catch((error) => console.log("error", error));

  return resData;
};







export const createEvent = async (
  event_name,
  event_location,
  lat,
  long,
  event_address,
  event_contact,
  event_type,
  event_catgeory_id,
  event_rsvp,
  event_free,
  event_price,
  event_seats,
  event_start_time,
  event_end_time,
  event_image,
  event_description
) => {
  console.log(
    "KKKKK",
    event_name,
    event_location,
    lat,
    long,
    event_address,
    event_contact,
    event_type,
    event_catgeory_id,
    event_rsvp,
    event_free,
    event_price,
    event_seats,
    event_start_time,
    event_end_time,
    event_image,
    event_description
  );
  let resData;

  var a = await AsyncStorage.getItem("@token");
  let token = JSON.parse(a);
  let b = await AsyncStorage.getItem("@user");
  b = JSON.parse(b);

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer` + token);
  myHeaders.append("Cookie", "mode=day");

  var formdata = new FormData();
  formdata.append("event_name", event_name);
  formdata.append("event_type", event_type);
  formdata.append("event_location", event_location);
  formdata.append("event_lat", lat);
  formdata.append("event_long", long);
  formdata.append("event_address", event_address);
  formdata.append("event_contact", event_contact);
  formdata.append("event_start_time", event_start_time);
  formdata.append("event_end_time", event_end_time);
  formdata.append("event_seats", event_seats);
  formdata.append("event_free", event_free);
  formdata.append("event_rsvp", event_rsvp);
  formdata.append("event_user_id", b.id);
  formdata.append("event_category_id", event_catgeory_id);
  formdata.append("event_image", event_image);
  formdata.append("event_description", event_description);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  await fetch(api.url + "/events/create", requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      if (result?.status === 401) {
        logout();
      }
      resData = result.data;
      console.log("event add", result);
    })
    .catch((error) => console.log("error", error));

  return resData;
};










export const updateEvent = async (
  id,
  event_name,
  event_location,
  lat,
  long,
  event_address,
  event_contact,
  event_type,
  event_catgeory_id,
  event_rsvp,
  event_free,
  event_price,
  event_seats,
  event_start_time,
  event_end_time,
  event_image,
  event_description
) => {
  console.log(
    "KKKKK",
    event_name,
    event_location,
    lat,
    long,
    event_address,
    event_contact,
    event_type,
    event_catgeory_id,
    event_rsvp,
    event_free,
    event_price,
    event_seats,
    event_start_time,
    event_end_time,
    event_image,
    event_description
  );
  let resData;

  var a = AsyncStorage.getItem("@token");
  let token = JSON.parse(a);
  let b = AsyncStorage.getItem("@user");
  b = JSON.parse(b);

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer` + token);
  myHeaders.append("Cookie", "mode=day");

  var formdata = new FormData();
  formdata.append("event_name", event_name);
  formdata.append("event_type", event_type);
  formdata.append("event_location", event_location);
  formdata.append("event_lat", lat);
  formdata.append("event_long", long);
  formdata.append("event_address", event_address);
  formdata.append("event_contact", event_contact);
  formdata.append("event_start_time", event_start_time);
  formdata.append("event_end_time", event_end_time);
  formdata.append("event_seats", event_seats);
  formdata.append("event_free", event_free);
  formdata.append("event_rsvp", event_rsvp);
  formdata.append("event_user_id", b.id);
  formdata.append("event_category_id", event_catgeory_id);
  formdata.append("event_image", event_image);
  formdata.append("event_description", event_description);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  await fetch(api.url + `/events/update/${id}`, requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      if (result?.status === 401) {
        logout();
      }
      resData = result.data;
      console.log("event add", result);
    })
    .catch((error) => console.log("error", error));

  return resData;
};




export const eventById = async (id) => {
  console.log("eventt id for eventById", id);

  let resData;
  let b = await AsyncStorage.getItem("@user");
  var formdata = new FormData();
  console.log("userrrrr", b);

  if (b != null) {
    b = JSON.parse(b);
    formdata.append("user_id", b.id);
  }

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  await fetch(`${api.url}events/user/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("resss detail page", result);
      resData = result;
      console.log("resss detail page 2", resData);
    })
    .catch((error) => console.log("error", error));

  return resData;
};



export const getAllUpcomingEvents = async (id, catId) => {
  let resData;

  var formdata = new FormData();
  formdata.append("event_id", id);
  formdata.append("event_category_id", catId);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  await fetch(`${api.url}event/upcoming`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      resData = result;
    })
    .catch((error) => console.log("error", error));

  return resData;
};
