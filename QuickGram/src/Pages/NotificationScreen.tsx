/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  FlatList,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Colors } from '../utils/Colors';
import { image } from '../utils/Images';
import AppText from '../atoms/AppText';
import { notifiType } from '../utils/Types';
import { useAppSelector } from '../redux/ReduxHook';
import { RequestStatusType } from '../utils/Enum';
import Apptextbutton from '../atoms/Apptextbutton';

const NotificationScreen = () => {
  const [notifications, setnotification] = useState<notifiType[]>([]);
  const user = useAppSelector(state => state.auth);
  console.log('notifications:', notifications);

  useEffect(() => {
    const subscriber = firestore()
      .collection('FriendRequest')
      .where('recieverid', '==', user.userid)
      .where('receiverstatus', '==', RequestStatusType.acceptOrreject)
      .onSnapshot(querySnapshot => {
        const notifationusers = querySnapshot.docs.map(
          doc =>
            ({
              id: doc.id,
              ...doc.data(),
            } as notifiType),
        );
        setnotification(notifationusers);
        console.log('firstload:', notifationusers);
      });
    return () => subscriber();
  }, []);

  const createroom = async (getid: string, getname: string) => {
    await firestore()
      .collection('chatRooms')
      .add({
        createdAt: firestore.FieldValue.serverTimestamp(),
        users: [
          {
            uid: user.userid,
            displayName: user.username,
          },
          {
            uid: getid,
            displayName: getname,
          },
        ],
      });
  };

  const handleaccept = async (updatestatus: string | undefined) => {
    console.log('getting id :', updatestatus);

    await firestore().collection('FriendRequest').doc(updatestatus).update({
      senderstatus: RequestStatusType.accept,
      receiverstatus: RequestStatusType.accept,
    });
  };

  const handlereject = async (updatestatus: string | undefined) => {
    console.log('getting id :', updatestatus);

    await firestore().collection('FriendRequest').doc(updatestatus).delete();
  };

  const renderitem = ({ item }: { item: notifiType }) => {
    console.log('render itemmmmmm:', item);

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
            Onpress={() => {
              handleaccept(item.id), createroom(item.senderid, item.sendername);
            }}
          />
          <Apptextbutton
            text={'delete'}
            textType="500-14"
            Style={styles.rejectbtn}
            Onpress={() => {
              handlereject(item.id);
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
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
      <FlatList
        data={notifications}
        renderItem={renderitem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view1: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    backgroundColor:Colors.headercolor,
    borderBottomColor: '#f0ebebff',
    
  },
  imageicon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    columnGap: 20,
    alignItems: 'center',
    marginEnd: 15,
  },
  rejectbtn: {
    color: 'white',
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 10,
  },
  message2: {
    height: 28,
    width: 28,
  },
  iconstyle: {
    height: 28,
    width: 28,
  },
  textview1: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  textview: {
    flex: 1,
    flexDirection: 'row',
  },
  confirmbtn: {
    color: 'white',
    backgroundColor: Colors.loginclr,
    padding: 8,
    borderRadius: 10,
  },
  addfriendview: {
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'flex-end',
  },
  headertextstyle: {
    padding: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },

  searchbar: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 45,
    borderColor: Colors.black,
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 30,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    padding: 15,
    borderBottomWidth: 2,
    backgroundColor: Colors.white,
    borderBottomColor: '#f0ebebff',
  },
});
