import {
    Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AppTextInput from '../atoms/AppTextInput';
import AppImage from '../atoms/AppImage';
import { image } from '../utils/Images';
import AppText from '../atoms/AppText';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ScreenType } from '../utils/Types';

const CommentScreen = () => {
  // const height = useHeaderHeight()
  const navigation = useNavigation<NavigationProp<ScreenType>>();
const [keybrd, setKeyboardVisible] = useState(Boolean);

   useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          setKeyboardVisible(true);
        },
      );
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          setKeyboardVisible(false);
        },
      );
      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    }, []);
    const keyboardOffset = keybrd ? 24 : 0;
    
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    //   keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    keyboardVerticalOffset={keyboardOffset}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
            
              flexDirection: 'row',
              paddingVertical: 12,
              marginHorizontal: 0,
              borderBottomWidth: 1,
              justifyContent: 'space-around',
              borderBottomColor: '#e3e0e0ff',
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AppImage
                source={image.backarrows}
                style={{ height: 30, width: 30 }}
              />
            </TouchableOpacity>
            <AppText
              text={'Comments'}
              type={'lastmessage'}
              style={{ fontSize: 20 }}
            />
            <AppImage
              source={image.threedot}
              style={{
                height: 30,
                width: 30,
                transform: [{ rotate: '90deg' }],
              }}
            />
          </View>
          <View style={{ marginHorizontal: 30, paddingVertical: 10 }}></View>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <View style={{ justifyContent: 'flex-end', height: 70 }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  columnGap: 20,
                  borderTopWidth: 1,                  
                  borderTopColor: '#e3e0e0ff',
                }}
              >
                <AppTextInput
                  onChangeText={function (text: string): void {
                    throw new Error('Function not implemented.');
                  }}
                  value={''}
                  placeholder={''}
                  style={{ borderWidth: 1, borderRadius: 20, width: 300 }}
                />
                <TouchableOpacity onPress={() => console.log('')}>
                  <AppImage
                    source={image.sendicon}
                    style={{ height: 30, width: 30 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CommentScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#00000040',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    maxHeight: '80%',
    minHeight: '50%',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },

  button: {
    borderRadius: 20,
    marginHorizontal: 100,
    paddingVertical: 20,
    elevation: 2,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
