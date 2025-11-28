/* eslint-disable react-hooks/exhaustive-deps */
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import ChatSearch from '../atoms/ChatSearch';
import { Colors } from '../utils/Colors';
import firestore from '@react-native-firebase/firestore';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Rootofchathome, ScreenType } from '../utils/Types';
import { useAppSelector } from '../redux/ReduxHook';
import HomeChatView from '../atoms/HomeChatView';
import ChatHomedatewise from '../atoms/ChatHomedatewise';

export type usernametype = {
  uid: string;
  displayName: string;
};

/*----------------------------------------renderlist-------------------------------------------------*/
const ChatListItem = ({
  username,
  usermessage,
  countreads,
}: {
  username: string;
  usermessage: Rootofchathome;
  countreads: number;
}) => {
  console.log('users:', username);

  return (
   <ChatHomedatewise usermessage={usermessage} countreads={countreads} username={username}/>
  );
};

/*-----------------------------------------chatHome------------------------------------------------*/

const ChatHomeScreen = () => {
  const user = useAppSelector(state => state.auth);
  console.log('useselector for user id:', user?.userid);
  const [searchitem, setSearchitem] = useState('');
  const [chatuser, setchatuser] = useState<Rootofchathome[]>([]);
  console.log('array flatlist', chatuser);
  const navigation = useNavigation<NavigationProp<ScreenType>>();
  const filteredData = chatuser.filter(item => {
    const currname = item.users.find(a => a.uid !== user.userid)?.displayName;
    return currname?.toLowerCase().includes(searchitem.toLowerCase());
  });

  /*-----------------------------------------Render item------------------------------------------------*/

  const renderItem = ({ item }: { item: Rootofchathome; index: number }) => {
    console.log(item);
    const chatname = item?.users?.find(
      (a: { uid: string }) => a.uid !== user?.userid,
    )?.displayName;
    const oppositeuserid = item?.users?.find(
      (a: { uid: string }) => a.uid !== user?.userid,
    )?.uid;
    console.log('user id is:', user?.userid);
    let countread;
    const time = item?.users?.find(
      (a: { uid: string }) => a.uid !== user?.userid,
    )?.uid;
    const currlastime = item.unreaduser?.[time]?.lasttimestamp;
    if (user?.userid) {
      countread = item.unreaduser?.[user?.userid]?.unreadcount || 0;
    }
    console.log('countread are:', countread);
    const chatmessage = item;
    /*-----------------------------------------Return------------------------------------------------*/
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('chatscreen', {
            discussionid: item.id,
            chatnamescrn: chatname,
            oppositeid: oppositeuserid,
            currlastime: currlastime,
          })
        }
      >
        <ChatListItem
          username={chatname!}
          usermessage={chatmessage!}
          countreads={countread!}
        />
      </TouchableOpacity>
    );
  };

  /*-----------------------------------------Show chat list------------------------------------------------*/

  useEffect(() => {
    const subscriber = firestore()
      .collection('chatRooms')
      .where('users', 'array-contains', {
        uid: user?.userid,
        displayName: user.username,
      })
      .onSnapshot(querySnapshot => {
        const rooms = querySnapshot.docs.map(
          doc =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Rootofchathome),
        );
        setchatuser(rooms);
      });
    return () => subscriber();
  }, []);
  /*-------------------------------------------Return----------------------------------------------*/

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <HomeChatView />
      <ChatSearch
        onChangeText={setSearchitem}
        value={searchitem}
        placeholder={'search'}
        style={styles.searchbar}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </KeyboardAvoidingView>
  );
};
/*-----------------------------------------------------------------------------------------*/
export default ChatHomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.white,
  },
  unreadview: {
    backgroundColor: '#8acc29ff',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  textview: {
    flex: 1,
  },
  timeview: {
    alignItems: 'flex-end',
  },
  bottomBorder: {
    width: '80%',
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
  },
  searchbar: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 45,
    borderBottomWidth:1,
    borderBottomColor:Colors.black,
    borderColor: Colors.black,
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 30,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#f0ebebff',
  },
});
