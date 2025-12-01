import { Image, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import AppText from './AppText'
import Appbackbtn from './Appbackbtn'
import Apptextbutton from './Apptextbutton'
import { Colors } from '../utils/Colors'
import { RequestStatusType } from '../utils/Enum'
import { image } from '../utils/Images'
import { notificationType, ScreenType } from '../utils/Types'
import { NavigationProp, useNavigation } from '@react-navigation/native'

type SearchViewType={
    item:notificationType;
    callback:()=>void;
}

const SearchView:FC<SearchViewType> = ({item,callback}) => {
      const navigation = useNavigation<NavigationProp<ScreenType>>();
  return (
    <View style={styles.listItem}>
            <Image source={image.profilelogo} style={styles.avatar} />
            <View style={styles.textview}>
              <AppText text={item.username} type={'chatpeople'} />
            </View>
            <View style={styles.addfriendview}>
              {item.requeststatus === RequestStatusType.pending ? (
                
                <AppText text={'requested'} type={'chatpeople'}
                style={[styles.following,{backgroundColor:Colors.lightReq,color:Colors.white}]} 
                />
                
              ) : item.requeststatus === RequestStatusType.accept ? (
                <AppText text={'following'} type={'chatpeople'} style={styles.following}/>
              ) : item.requeststatus === RequestStatusType.acceptOrreject ? (
                <Appbackbtn
                  source={image.goto}
                  style={styles.iconstyle}
                  Onpress={() => navigation.navigate('notificationscreen')}
                />
              ) : (
                <Apptextbutton                                                              
                  text={'follow'}
                  textType={'textbutton'}
                  Onpress={callback}
                  Style={styles.followbtn}
                />
              )}
            </View>
          </View>
  )
}

export default SearchView

const styles = StyleSheet.create({
    listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius:20,
    marginHorizontal:20,
    paddingVertical:20,
    marginVertical:5,
    borderWidth:1,
    borderBottomWidth: 1,
    backgroundColor:Colors.white,
  },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 15,
    },
    textview: {
    flex: 1,
    flexDirection: 'row',
  },
  addfriendview: {
      alignItems: 'flex-end',
    },
     following:{backgroundColor: Colors.frndchatclr,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,},
      headertextstyle: {
        padding: 10,
        backgroundColor: Colors.headercolor,
        // borderBottomWidth: 2,
        // borderBottomColor: '#f0ebebff',
      },
        iconstyle: {
    height: 28,
    width: 28,
  },

  followbtn: {
    backgroundColor: Colors.maingreen,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
})