import React, { FC } from 'react';
import { TextInput, TextInputProps, View, ViewStyle } from 'react-native';



type ChatSearchType = {
  onChangeText: (text: string) => void;
  value: string;
  placeholder: string;
  style: ViewStyle;
  props?: TextInputProps;
};

const ChatSearch: FC<ChatSearchType> = ({
  onChangeText,
  value,
  placeholder,
  style,
  props,
}) => {
  return (
    <View>
      <TextInput style={style}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        {...props} />
    </View>
  );
};

export default ChatSearch;
