import {  TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import React, { FC } from 'react';

type AppTextInputType = {
  onChangeText: (text:string) => void;
  value: string;
  placeholder: string;
  style:ViewStyle;
  props?: TextInputProps;
};
const AppTextInput: FC<AppTextInputType> = ({
  onChangeText,
  value,
  placeholder,
  style,
  props,
}) => {
  return (
    <View>
      <TextInput
        style={style}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        {...props}
      />
    </View>
  );
};

export default AppTextInput;


