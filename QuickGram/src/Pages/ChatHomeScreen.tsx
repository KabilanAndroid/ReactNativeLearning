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
const user = auth().currentUser;

type DisplayType = {
  users: usernametype;
};
export type usernametype = {
  uid: string;
  displayName: string;
};

const ChatListItem = ({ users }: { users: string }) => {
  console.log('users:', users);

  return (
    
      <View style={styles.listItem}>
        <Image source={image.profilelogo} style={styles.avatar} />
        <View style={styles.textview}>
          <AppText
            text={users}
            type={'chatpeople'}
            rest={{
              numberOfLines: 200,
            }}
          />
          <AppText
            text="message hi hello how are you yh uhhiodsfsdf "
            type="lastmessage"
          />
        </View>
        <View style={styles.timeview}>
          <AppText text="12.00 Am" type="500-14" />
          <View style={styles.unreadview}>
            <AppText text="unread" type="500-14" />
          </View>
        </View>
      </View>
    
  );
};

const ChatHomeScreen = () => {
  const [searchitem, setSearchitem] = useState('');
  const [chatuser, setchatuser] = useState([]);
  console.log('array flatlist', chatuser);
const navigation = useNavigation()



  const renderItem = ({ item }: DisplayType[]) => {
    const chatname = item.users.find((a: { uid: string  }) => a.uid !== user?.uid)?.displayName;
    console.log('chatname:', chatname);

   
    return (
      <TouchableOpacity onPress={()=> navigation.navigate('chatDiscuss',{data:item.id})}>
    <ChatListItem users={chatname} />
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
