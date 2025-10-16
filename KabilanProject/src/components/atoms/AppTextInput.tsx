import React from 'react';
import { TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const CustomTextInput = ({ label, placeholder, icon,icon1, value, onChangeText, style, iconStyle }:any) => {
  return (
    <TextInput
      mode="outlined"
      label={label}
      placeholder={placeholder}
      left={<TextInput.Icon icon={icon} style={iconStyle} />}
      right={<TextInput.Icon icon={icon1} style={iconStyle} />}
      style={[styles.input, style]} 
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    width: '80%',
    marginTop: 15,
    color: '#000',
    textAlign: 'center',
  },
  
});

export default CustomTextInput;