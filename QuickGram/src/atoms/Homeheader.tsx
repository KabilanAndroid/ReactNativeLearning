import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import AppImage from './AppImage'
import AppText from './AppText'
import { image } from '../utils/Images'
import { Colors } from '../utils/Colors'

type HomeheaderType ={
    logout:()=>void;
}

const Homeheader:FC<HomeheaderType> = ({logout}) => {
  return (
    <View style={styles.textview}>
            <View style={{flex:1,alignItems:'flex-end'}}>
            <AppText
              text={'Home'}
              type={'heardertext'}
              style={styles.headertextstyle}
            />
            </View>
            <View style={{flex:1,alignItems:'flex-end'}}>
            <TouchableOpacity onPress={logout}>
              <AppImage source={image.logout} style={styles.logout} />
            </TouchableOpacity>
            </View>
            </View>
  )
}

export default Homeheader

const styles = StyleSheet.create({
    textview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    alignItems: 'center',
    borderBottomColor: Colors.borderbottomcolor,
    backgroundColor: Colors.headercolor,
  },
  headertextstyle: {
    padding: 10,
  },
  logout: { height: 40, width: 40 },
})