import {
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, { FC, memo } from 'react';
import AppText from './AppText';

type AppButtonType = {
  text: string;
  TextStyles?:TextStyle;
  Style?: ViewStyle;
  Onpress:()=>void;
};

const AppButton: FC<AppButtonType> = ({Style,Onpress,text,TextStyles}) => {
  return <TouchableOpacity style={Style} onPress={Onpress} >
  <AppText text={text} type='buttonText'style={TextStyles} />
  
    
  </TouchableOpacity>;
};

export default memo(AppButton);


