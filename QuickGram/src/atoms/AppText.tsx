import { StyleProp, Text, TextProps, TextStyle, View } from 'react-native';
import React, { FC, memo } from 'react';
import { Colors } from '../utils/Colors';

type AppTextType = {
  text: string;
  style?: StyleProp<TextStyle>;
  type: AppItemType;
  rest?: TextProps;
};
export type AppItemType =
  | 'edittext'
  | 'logoutbtn'
  | 'heardertext'
  | 'unread'
  | 'timestamptxt'
  | 'lastmessage'
  | 'chatpeople'
  | 'signupfont'
  | 'donthave'
  | 'buttonText'
  | 'welcomeText'
  | 'LoginText'
  | 'userText'
  | 'textbutton'
  | 'loginbtn'
  | '500-14';

const AppText: FC<AppTextType> = ({ text, style, type, rest }) => {
  const AppType: Record<AppItemType, TextStyle> = {
    buttonText: {
      color: Colors.introbg,
      fontSize: 24,
      fontFamily: 'bold',
      textAlign: 'center',
    },
    loginbtn: {
      color: 'white',
      fontSize: 18,
    },
    chatpeople: {
      fontSize: 18,
    },
    heardertext: {
      fontSize: 30,
    },
    lastmessage: {
      fontSize: 15,
    },
    welcomeText: {
      color: Colors.introbtn,
    },
    LoginText: {
      color: Colors.logintxt,
      fontWeight: '900',
      fontSize: 28,
    },
    edittext: {
      color: 'black',
      fontSize: 22,
    },
    logoutbtn: {
      color: 'white',
      fontWeight: '600',
      fontSize: 26,
    },
    userText: {
      color: Colors.logintxt,
      fontSize: 18,
      fontWeight: '700',
    },
    textbutton: {
      color: 'black',
    },
    '500-14': {
      fontSize: 14,
    },
    unread: {
      fontSize: 14,
      color: 'white',
    },
    signupfont: {
      fontSize: 18,
      fontWeight: '600',
      color: Colors.loginclr,
    },
    donthave: {
      fontSize: 18,
      fontWeight: '600',
    },
    timestamptxt: {
      fontSize: 10,
    },
  };

  return (
    <View>
      <Text numberOfLines={1} style={[style, AppType[type]]} {...rest}>
        {text}
      </Text>
    </View>
  );
};

export default memo(AppText);
