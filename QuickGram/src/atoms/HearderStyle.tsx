import {  Image, StyleSheet,  View } from 'react-native'
import React, { memo } from 'react'
import Appbackbtn from './Appbackbtn'
import AppText from './AppText'
import { Colors } from '../utils/Colors'
import { image } from '../utils/Images'
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { ScreenType } from '../utils/Types'
import AppImage from './AppImage'

const HearderStyle = () => {
      const navigation = useNavigation<NavigationProp<ScreenType>>();
      const route = useRoute<RouteProp<ScreenType>>();
        const routeData = route.params;
  return (
    <View style={styles.heaaderstyle}>
        <View style={styles.view1sub}>
          <Appbackbtn
            Style={styles.backbtnstyle}
            source={image.backarrows}
            style={styles.backbtnstyle1}
            Onpress={() => navigation.goBack()}
          />

          <Image source={image.whiteimg} style={styles.avatar} />
          <View style={{ }}>
            <AppText text={routeData?.chatnamescrn!} type={'chatpeople'} />
            {routeData?.currlastime ? (
              <AppText
                text={`last seen ${routeData?.currlastime
                  ?.toDate()
                  ?.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  })}`}
                type={'500-14'}
              />
            ) : null}
          
        </View>
        </View>

        <View style={styles.view2sub}>
          <AppImage source={image.videoicon} style={styles.callicon} />
          <AppImage source={image.callicon} style={styles.callicon} />
          <AppImage source={image.threedot} style={styles.callicon} />
        </View>
      </View>
  )
}

export default memo(HearderStyle)

const styles = StyleSheet.create({

      heaaderstyle: {
        flexDirection: 'row',
        backgroundColor: Colors.headercolor,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        borderBottomWidth: 0,
        shadowRadius: 3,
        padding: 15,
        columnGap: 100,
      },
       callicon: {
    height: 26,
    width: 26,
  },
      view2sub: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 15,
    justifyContent: 'flex-end',
  },
      view1sub: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
    avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  backbtnstyle: {
    paddingVertical: 5,
    paddingHorizontal: 1,
  },
   backbtnstyle1: {
    height: 36,
    width: 36,
  },
})