import { ImageSourcePropType, ImageStyle,  TouchableOpacity, ViewStyle } from 'react-native';
import React, { FC, memo } from 'react';
import AppImage from './AppImage';


type AppButtonType = {
  Style?: ViewStyle;
  Onpress: () => void;
  source:ImageSourcePropType;
  style:ImageStyle;
};

const Appbackbtn: FC<AppButtonType> = ({ Style, Onpress,source ,style}) => {
  return (
    <TouchableOpacity style={Style} onPress={Onpress}>
      <AppImage source={source} style={style} />
    </TouchableOpacity>
  );
};

export default memo(Appbackbtn);


