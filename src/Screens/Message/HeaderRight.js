import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';


const HeaderRight = ({ onPressFunc1, onPressFunc2 }) => {
  return (
    <>
      <TouchableOpacity onPress={onPressFunc1}>
      <Icon name="trash" size={24} color="#fff" style={{ marginRight: 20 }} />

      </TouchableOpacity>
      <TouchableOpacity onPress={onPressFunc2}>
      <Icon name="user-x" size={24} color="#fff" style={{ marginRight: 20 }} />

      </TouchableOpacity>
    </>
  );
};

export default HeaderRight;