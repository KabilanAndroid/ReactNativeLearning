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
import auth from '@react-native-firebase/auth';
import { image } from '../utils/Images';
import { Colors } from '../utils/Colors';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Rootofchathome } from '../utils/Types';
const user = auth().currentUser;


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
  usermessage: string;
  countreads: string;
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
          <AppText text={countreads} type="unread" />
        </View>
      </View>
    </View>
  );
};

const ChatHomeScreen = () => {
  const [searchitem, setSearchitem] = useState('');
  const [chatuser, setchatuser] = useState([]);
  console.log('array flatlist', chatuser);
  const navigation = useNavigation();

  const renderItem = ({
    item,
    index,
  }: {
    item: Rootofchathome;
    index: number;
  }) => {
    console.log(item);

    const chatname = item?.users?.find(
      (a: { uid: string }) => a.uid !== user?.uid,
    )?.displayName;
    const oppositeuserid = item?.users?.find(
      (a: { uid: string }) => a.uid !== user?.uid,
    )?.uid;
    console.log("user id is:",user?.uid)
    let countread
    if(user?.uid){
      countread = item.unreaduser?.[user?.uid]?.unreadcount||0
    }

    console.log('countread are:', countread);

    const chatmessage = item;

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('chatDiscuss', {
            data: item.id,
            chatnamescrn: chatname,
            oppositeid: oppositeuserid,
          })
        }
      >
        <ChatListItem
          username={chatname}
          usermessage={chatmessage}
          countreads={countread}
        />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('chatRooms')
      .onSnapshot(querySnapshot => {
        const newMessages = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setchatuser(newMessages);
        console.log('firstload:', newMessages);
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
    backgroundColor: 'red',
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
