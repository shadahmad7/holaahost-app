import React from 'react';
import {api} from '../config/api';

export const getAllEventCategories = async () => {
  let resData;

  var myHeaders = new Headers();

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  resData = await fetch(`${api.url}eventcategory`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log('Event Category----', result);
      return result;
    })
    .catch(error => console.log('error', error));

  return resData;
};
