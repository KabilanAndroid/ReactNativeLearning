import React from 'react';
import { TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const CustomFormTextInput = ({ label, placeholder,  value, onChangeText, style, }:any) => {
  return (
    <TextInput
      mode="outlined"
      label={label}
      placeholder={placeholder}
      style={[styles.input, style]} 
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    width: '100%',
    marginTop: 15,
    color: '#000',
    textAlign: 'center',
    justifyContent:'center'
  },
  
});

export default CustomFormTextInput;