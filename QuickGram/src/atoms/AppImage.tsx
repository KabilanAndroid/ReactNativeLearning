import { Image, ImageSourcePropType, ImageStyle, StyleProp } from 'react-native'
import React, { FC, memo, useMemo } from 'react'
type AppImgType = {
    source:ImageSourcePropType,
    style?: StyleProp<ImageStyle>;
}
const AppImage:FC <AppImgType> = ({source,style}) => {
  return (
    <Image source={source} style={style}/>
  )
}

export default memo(AppImage)

