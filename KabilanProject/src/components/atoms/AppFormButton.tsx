import React, { FC } from 'react';
import { TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';

type custtype={
  label:string,
  placeholder:string,  
  value:string, 
  onChangeText:()=>void, 
  style:string,
}
const CustomFormTextInput:FC<custtype> = ({ label, placeholder,  value, onChangeText, style, }) => {
  
  
  return (
    <TextInput
      mode="outlined"
      label={label}
      placeholder={placeholder}
      style={[styles.input]} 
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    width: '80%',
    margin: 50,
    marginStart:40,
    color: '#000',
    textAlign: 'center',
    justifyContent:'center',
    
  },
  
});

export default CustomFormTextInput;