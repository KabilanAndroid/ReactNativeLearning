/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
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

const NotificationScreen = () => {
  const [notifications, setnotification] = useState<notifiType[]>([]);
  const user = useAppSelector(state => state.auth);
  console.log('notifications:', notifications);

  useEffect(() => {
    const subscriber = firestore()
      .collection('FriendRequest')
      .where('recieverid', '==', user.userid)
      .where('status', '==', RequestStatusType.pending)
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

    await firestore()
      .collection('FriendRequest')
      .doc(updatestatus)
      .update({
        status: RequestStatusType.accept,
      });
  };

  const renderitem = ({ item }: { item: notifiType }) => {
    console.log('render item:', item);

    return (
      <View style={styles.listItem}>
        <Image source={image.profilelogo} style={styles.avatar} />
        <View style={styles.textview}>
          <AppText text={item.sendername} type={'chatpeople'} />
        </View>
        <View style={styles.addfriendview}>
          <TouchableOpacity>
            <AppText
              text={'reject'}
              type={'500-14'}
              style={{ color: 'white', backgroundColor: 'black', padding: 8 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleaccept(item.id), createroom(item.senderid, item.sendername);
            }}
          >
            <AppText
              text={'accept'}
              type={'500-14'}
              style={{
                color: 'white',
                backgroundColor: Colors.loginclr,
                padding: 8,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <AppText
        text={'Notification'}
        type={'LoginText'}
        style={styles.headertextstyle}
      />
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
  iconstyle: {
    height: 28,
    width: 28,
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
  headertextstyle: {
    padding: 10,
    backgroundColor: Colors.introbg,
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
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.introbg,
  },
});
