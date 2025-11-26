import { FlatList,  StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Colors } from '../utils/Colors';
import { notifiType } from '../utils/Types';
import { useAppSelector } from '../redux/ReduxHook';
import { RequestStatusType } from '../utils/Enum';
import NotificationList from '../atoms/NotificationList';
import NotificationView from '../atoms/NotificationView';

const NotificationScreen = () => {
  const [notifications, setnotification] = useState<notifiType[]>([]);
  const user = useAppSelector(state => state.auth);
  console.log('notifications:', notifications);
  /*-------------------------------------rendering notification------------------------------------------ */
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /*------------------------------------creating room for chat------------------------------------------- */
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
  /*--------------------------------------accept operation----------------------------------------- */
  const handleaccept = async (updatestatus: string | undefined) => {
    console.log('getting id :', updatestatus);
    await firestore().collection('FriendRequest').doc(updatestatus).update({
      senderstatus: RequestStatusType.accept,
      receiverstatus: RequestStatusType.accept,
    });
  };
  /*----------------------------------------reject operation--------------------------------------- */
  const handlereject = async (updatestatus: string | undefined) => {
    console.log('getting id :', updatestatus);
    await firestore().collection('FriendRequest').doc(updatestatus).delete();
  };
  /*-----------------------------------------render item-------------------------------------- */
  const renderitem = ({ item }: { item: notifiType }) => {
    console.log('render itemmmmmm:', item);
    return (
      <NotificationList
        item={item}
        callback={() => { 
          console.log("press",item);
          handleaccept(item.id) 
         createroom(item.senderid, item.sendername);
        }}
        handlereject={() => {
          handlereject(item.id);
        }}
      />
    );
  };
  /*-------------------------------------Return------------------------------------------ */
  return (
    <View style={styles.container}>
      <NotificationView/>
      <FlatList
        data={notifications}
        renderItem={renderitem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
  /*--------------------------------------------------------------------------------------- */
export default NotificationScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  iconstyle: {
    height: 28,
    width: 28,
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
});
