import { ImageSourcePropType, ImageStyle, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'

type AppModelcomp = {
  Style?: ViewStyle;
  Onpress: () => void;
  source:ImageSourcePropType;
  style:ImageStyle;
};

const AppModelcomp = () => {
  return (
    <View>
      <Text>AppModelcomp</Text>
    </View>
  )
}

export default AppModelcomp

const styles = StyleSheet.create({})