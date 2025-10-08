/* eslint-disable react-native/no-inline-styles */
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, { FC } from 'react';

type AppButtonType = {
  text?: string;
  callBack: (id: number) => void;
  buttonBg?: ColorValue;
  buttonStyle: StyleProp<ViewStyle>;
  theme: 'primary' | 'secanrday ';
};

const AppButton: FC<AppButtonType> = ({
  text = 'Click',
  callBack,
  buttonBg,
  theme,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => callBack(3)}
      style={[
        styles.container,
        styles.buttonStyle,
        { backgroundColor: theme === 'primary' ? 'red' : buttonBg },
      ]}
    >
      <Text style={[styles.textStyle, { fontSize: 16 }]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  textStyle: {
    color: 'white',
  },
  buttonStyle: {
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
});
