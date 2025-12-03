import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { image } from '../utils/Images'
import AppImage from './AppImage'
import AppText from './AppText'


type CommentHeaderType ={
    callback:()=>void;
}
const CommentHeader:FC<CommentHeaderType> = ({callback}) => {
  return (
    <View style={styles.commentheader}>
              <TouchableOpacity onPress={callback}>
                <AppImage source={image.backarrows} style={styles.icon} />
              </TouchableOpacity>
              <AppText
                text={'Comments'}
                type={'lastmessage'}
                style={{ fontSize: 20 }}
              />
              <AppImage
                source={image.threedot}
                style={[styles.icon, { transform: [{ rotate: '90deg' }] }]}
              />
            </View>
  )
}

export default CommentHeader

const styles = StyleSheet.create({
     commentheader: {
    flexDirection: 'row',
    paddingVertical: 12,
    marginHorizontal: 0,
    borderBottomWidth: 1,
    justifyContent: 'space-around',
    borderBottomColor: '#e3e0e0ff',
  },
  icon: { height: 30, width: 30 },
})