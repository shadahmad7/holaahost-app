import React from 'react';
import {api} from '../config/api';

export const getAllGroupCategories = async () => {
  let resData;

  var myHeaders = new Headers();

  var requestOptions = {
    method: 'GET',

    headers: myHeaders,
    redirect: 'follow',
  };

  resData = await fetch(`${api.url}/groupcategory`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log('Category----', result);
      return result;
    })
    .catch(error => console.log('error', error));

  return resData;
};
