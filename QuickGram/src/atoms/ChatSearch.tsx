import React, { FC } from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';

type ChatSearchType = {
  placeholder: string;
  onChangeText: (text: string) => void;
  value: string;
  icon:IconSource;
};

const ChatSearch: FC<ChatSearchType> = ({
  placeholder,
  onChangeText,
  value,
  icon
}) => {
  return (
    <View>
      <Searchbar
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        icon={icon}
      />
    </View>
  );
};

export default ChatSearch;
