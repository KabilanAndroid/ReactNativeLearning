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
import AppText from '../atoms/AppText';
import ChatSearch from '../atoms/ChatSearch';
import { image } from '../utils/Images';
import { Colors } from '../utils/Colors';
import firestore from '@react-native-firebase/firestore';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Rootofchathome, ScreenType } from '../utils/Types';
import { useAppSelector } from '../redux/ReduxHook';

export type usernametype = {
  uid: string;
  displayName: string;
};

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
    <View style={styles.listItem}>
      <Image source={image.profilelogo} style={styles.avatar} />
      <View style={styles.textview}>
        <AppText
          text={username}
          type={'chatpeople'}
          rest={{
            numberOfLines: 200,
          }}
        />
        <AppText text={usermessage?.lastmessage} type="lastmessage" />
      </View>
      <View style={styles.timeview}>
        <AppText
          text={usermessage?.lasttime?.toDate()?.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}
          type="500-14"
        />
        <View style={styles.unreadview}>
          <AppText text={countreads?.toString()} type="unread" />
        </View>
      </View>
    </View>
  );
};

const ChatHomeScreen = () => {
  const user = useAppSelector(state => state.auth);
  console.log('useselector for user id:', user?.userid);

  const [searchitem, setSearchitem] = useState('');
  const [chatuser, setchatuser] = useState<Rootofchathome[]>([]);
  console.log('array flatlist', chatuser);
  const navigation = useNavigation<NavigationProp<ScreenType>>();

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
    if (user?.userid) {
      countread = item.unreaduser?.[user?.userid]?.unreadcount || 0;
    }

    console.log('countread are:', countread);

    const chatmessage = item;

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('chatscreen', {
            discussionid: item.id,
            chatnamescrn: chatname,
            oppositeid: oppositeuserid,
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
            }as Rootofchathome),
        );
        setchatuser(rooms);
      
        
      });
    return () => subscriber();
  }, []);

















  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <AppText
        text={'Chat'}
        type={'LoginText'}
        style={styles.headertextstyle}
      />
      <ChatSearch
        onChangeText={setSearchitem}
        value={searchitem}
        placeholder={'search'}
        style={styles.searchbar}
      />
      <FlatList
        data={chatuser}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </KeyboardAvoidingView>
  );
};

export default ChatHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.loginbg,
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
  headertextstyle: {
    padding: 10,
    backgroundColor: Colors.introbg,
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.introbg,
  },
});
