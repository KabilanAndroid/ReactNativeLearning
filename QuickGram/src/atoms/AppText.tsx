import { Text, TextStyle, View } from 'react-native';
import React, { FC, memo } from 'react';
import { Colors } from '../utils/Colors';

type AppTextType = {
  text: string;
  style?: TextStyle;
  type: AppItemType;
};
export type AppItemType =
  | 'signupfont'
  | 'donthave'
  | 'buttonText'
  | 'welcomeText'
  | 'LoginText'
  | 'userText'
  | 'textbutton'
  | 'loginbtn'
  | '500-14';

const AppText: FC<AppTextType> = ({ text, style, type }) => {
  const AppType: Record<AppItemType, TextStyle> = {
    buttonText: {
      color: Colors.introbg,
      fontSize: 24,
      fontFamily: 'bold',
      textAlign: 'center',
    },
    loginbtn: {
      color: 'white',
      fontSize:18,
    },
    welcomeText: {
      color: Colors.introbtn,
    },
    LoginText: {
      color: Colors.logintxt,
      fontWeight: '900',
      fontSize: 32,
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
    signupfont: {
      fontSize: 18,
      fontWeight: '600',
      color:Colors.loginclr
    },
    donthave: {
      fontSize: 18,
      fontWeight: '600',
    },
  };

  return (
    <View>
      <Text style={[style, AppType[type]]}>{text}</Text>
    </View>
  );
};

export default memo(AppText);
