import { TouchableOpacity, ViewStyle } from 'react-native';
import React, { FC, memo } from 'react';
import AppText, { AppItemType } from './AppText';

type AppTextButtonType = {
  text: string;
  Style?: ViewStyle;
  Onpress: () => void;
  textType?:AppItemType
};
const Apptextbutton: FC<AppTextButtonType> = ({ text, Style, Onpress ,textType='textbutton'}) => {
  return (
    <TouchableOpacity style={Style} onPress={Onpress}>
      <AppText text={text} type={textType} />
    </TouchableOpacity>
  );
};

export default memo(Apptextbutton);
