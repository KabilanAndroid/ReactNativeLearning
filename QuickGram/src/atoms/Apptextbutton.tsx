import { TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import React, { FC, memo } from 'react';
import AppText, { AppItemType } from './AppText';

type AppTextButtonType = {
  text: string;
  Style?: ViewStyle;
  Onpress: () => void;
  textType?:AppItemType
  textstyle?:TextStyle
};
const Apptextbutton: FC<AppTextButtonType> = ({textstyle, text, Style, Onpress ,textType='textbutton'}) => {
  return (
    <TouchableOpacity style={Style} onPress={Onpress}>
      <AppText text={text} type={textType} style={textstyle}/>
    </TouchableOpacity>
  );
};

export default memo(Apptextbutton);
