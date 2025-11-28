import { Image, StyleSheet,  View } from 'react-native'
import React, { memo } from 'react'
import AppText from './AppText'
import { Colors } from '../utils/Colors'
import { image } from '../utils/Images'


const NotificationView = () => {
  return (
    <View style={styles.view1}>
            <View style={styles.textview1}>
              <AppText
                text={'Notification'}
                type={'heardertext'}
                style={styles.headertextstyle}
              />
            </View>
            <View style={styles.imageicon}>
              <Image source={image.bell2} style={styles.message2} />
            </View>
          </View>
  )
}

export default memo(NotificationView)

const styles = StyleSheet.create({

    view1: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    backgroundColor: Colors.headercolor,
    borderBottomColor: '#f0ebebff',
  },
  textview1: { flex: 1, flexDirection: 'row', alignItems: 'center' },
   headertextstyle: {
    padding: 10,
  },
  imageicon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    columnGap: 20,
    alignItems: 'center',
    marginEnd: 15,
  },
   message2: {
    height: 28,
    width: 28,
  },
})