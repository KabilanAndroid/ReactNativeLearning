import {
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, { FC, memo } from 'react';
import AppText from './AppText';

type AppButtonType = {
  text: string;
  Style?: ViewStyle;
  Onpress:()=>void;
};

const AppButton: FC<AppButtonType> = ({Style,Onpress,text}) => {
  return <TouchableOpacity style={Style} onPress={Onpress} >
  <AppText text={text}  type={'buttonText'}/>
  
    
  </TouchableOpacity>;
};

export default memo(AppButton);


