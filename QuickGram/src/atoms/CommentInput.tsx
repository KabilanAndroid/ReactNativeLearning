import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Dispatch, FC, SetStateAction } from 'react'
import { image } from '../utils/Images'
import AppImage from './AppImage'
import AppTextInput from './AppTextInput'

type CommentInputType ={
    setsendcommentstate:Dispatch<SetStateAction<string>>;
    sendcommentstate:string;
    sendcoment:()=>void;
    show:boolean;
}

const CommentInput:FC<CommentInputType> = ({setsendcommentstate,sendcommentstate,sendcoment,show}) => {
  return (
     <View style={styles.textinputmain}>
              <View style={styles.textinputmaininsideview}>
                <AppTextInput
                  onChangeText={setsendcommentstate}
                  value={sendcommentstate}
                  placeholder={'comments...'}
                  style={styles.textinputinside}
                  props={{
                    multiline: true,
                  }}
                />
                {show ? (
                  <TouchableOpacity onPress={sendcoment}>
                    <AppImage source={image.sendicon} style={styles.icon} />
                  </TouchableOpacity>
                ) : (
                  <AppImage source={image.sendicon} style={styles.icon} />
                )}
              </View>
            </View>
  )
}

export default CommentInput

const styles = StyleSheet.create({
    textinputmain: { justifyContent: 'flex-end', height: 70 },
     textinputmaininsideview: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 20,
    borderTopWidth: 1,
    borderTopColor: '#e3e0e0ff',
  },
   
  textinputinside: { borderWidth: 1, borderRadius: 20, width: 300 },
    icon: { height: 30, width: 30 },
})