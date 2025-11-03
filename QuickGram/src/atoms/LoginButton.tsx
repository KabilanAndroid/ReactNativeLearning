import {
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, { FC, memo } from 'react';
import AppText from './AppText';

type LoginButtonType = {
  text: string;
  Style?: ViewStyle;
  Onpress:()=>void;
};

const LoginButton: FC<LoginButtonType> = ({Style,Onpress,text}) => {
  return <TouchableOpacity style={Style} onPress={Onpress} >
  <AppText text={text}  type={'loginbtn'}/>
  
    
  </TouchableOpacity>;
};

export default memo(LoginButton);
