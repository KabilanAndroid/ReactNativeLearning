import { Image, ImageSourcePropType, ImageStyle } from 'react-native'
import React, { FC, memo, useMemo } from 'react'
type AppImgType = {
    source:ImageSourcePropType,
    style?: ImageStyle;
}
const AppImage:FC <AppImgType> = ({source,style}) => {
  return (
    <Image source={source} style={style}/>
  )
}

export default memo(AppImage)

