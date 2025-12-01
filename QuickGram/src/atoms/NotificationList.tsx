import { Image, StyleSheet, View } from 'react-native';
import React, { FC, memo } from 'react';
import AppText from './AppText';
import Apptextbutton from './Apptextbutton';
import { Colors } from '../utils/Colors';
import { image } from '../utils/Images';
import { notifiType } from '../utils/Types';

type NotificationListType = {
  item:notifiType;
  callback:()=>void;
  handlereject:()=>void;
};

const NotificationList: FC<NotificationListType> = ({
  item,
  callback,
  handlereject,
}) => {
  return (
    <View style={styles.listItem}>
      <Image source={image.profilelogo} style={styles.avatar} />
      <View style={styles.textview}>
        <AppText text={item.sendername} type={'chatpeople'} />
      </View>
      <View style={styles.addfriendview}>
        <Apptextbutton
          text={'Confirm'}
          textType={'500-14'}
          Style={styles.confirmbtn}
          Onpress={callback}
          textstyle={{color:Colors.white}}
        />
        <Apptextbutton
          text={'delete'}
          textType="500-14"
          Style={styles.rejectbtn}
          Onpress={handlereject}
        />
      </View>
    </View>
  );
};

export default memo(NotificationList);

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    padding: 15,
    borderWidth:1,
    borderBottomWidth:1,
    borderRadius:20,
    backgroundColor: Colors.white,
   marginHorizontal:10,
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
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'flex-end',
  },
  confirmbtn: {
    color: 'white',
    backgroundColor: Colors.loginclr,
    padding: 8,
    borderRadius: 10,
  },
  rejectbtn: {
    color:'white',
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 10,
  },
});
