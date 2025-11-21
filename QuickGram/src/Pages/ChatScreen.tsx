/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AppText from '../atoms/AppText';
import { image } from '../utils/Images';
import Appbackbtn from '../atoms/Appbackbtn';
import AppTextInput from '../atoms/AppTextInput';
import AppImage from '../atoms/AppImage';
import firestore from '@react-native-firebase/firestore';
import { MessageseenType, MessageType, ScreenType } from '../utils/Types';
import {
  
  RouteProp,
  
  useRoute,
} from '@react-navigation/native';
import { useAppSelector } from '../redux/ReduxHook';
import { Colors } from '../utils/Colors';

const ChatScreen = () => {
  const [lastvisible, setlastvisible] = useState<Partial<MessageType>>();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [keybrd, setKeyboardVisible] = useState(Boolean);
  const [newMessage, setNewMessage] = useState('');
  const user = useAppSelector(state => state.auth);
  const route = useRoute<RouteProp<ScreenType>>();
  const routeData = route.params;
  console.log('routeparam:', messages);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const keyboardOffset = keybrd ? 24 : 0;

  useEffect(() => {
    const subscriber = firestore()
      .collection('chatRooms')
      .doc(routeData?.discussionid?.toString())
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .limit(20)
      .onSnapshot(querySnapshot => {
        const newMessages = querySnapshot.docs.map(
          doc =>
            ({
              id: doc.id,
              ...doc.data(),
            } as MessageType),
        );
        setMessages(newMessages);
        console.log('firstload:', newMessages);
        const firstloadlast = querySnapshot.docs[querySnapshot.docs.length - 1];

        console.log('first final :', firstloadlast);

        setlastvisible(firstloadlast);
      });
    return () => subscriber();
  }, [routeData]);

  const loadMoreMessages = async () => {
    try {
      if (!lastvisible) return;

      const querySnapshot = await firestore()
        .collection('chatRooms')
        .doc(routeData?.discussionid?.toString())
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .startAfter(lastvisible)
        .limit(20)
        .get();

      const moreMessages = querySnapshot.docs.map(
        doc =>
          ({
            id: doc.id,
            ...doc.data(),
          } as MessageType),
      );

      console.log('moremessage: ', moreMessages);
      setMessages(prevMessages => [...prevMessages, ...moreMessages]);

      if (querySnapshot.docs.length > 0) {
        const secondvisiblelast =
          querySnapshot.docs[querySnapshot.docs.length - 1];
        setlastvisible(secondvisiblelast);
      } else {
      }
    } catch (error) {
      console.error('Error loading more messages:', error);
    }
  };

  const bluetick = async () => {
    const batch = firestore().batch();
    const querySnapshot = await firestore()
      .collection('chatRooms')
      .doc(routeData?.discussionid)
      .collection('messages')
      .where('recieverId', '==', user.userid)
      .where('senderId', '==', routeData?.oppositeid)
      .where('status', '==', 'delivered')
      .get();
    querySnapshot.forEach(documentSnapshot => {
      batch.update(documentSnapshot.ref, { [`status`]: 'seen' });
    });
    return batch.commit();
  };
  const sendMessage = async () => {
    if (newMessage.trim() === '' || !user) {
      return;
    }
    try {
      await firestore()
        .collection('chatRooms')
        .doc(routeData?.discussionid?.toString())
        .collection('messages')
        .add({
          text: newMessage,
          senderId: user?.userid,
          status: 'delivered',
          recieverId: routeData?.oppositeid,
          timestamp: firestore.FieldValue.serverTimestamp(),
        });
      setNewMessage('');
      console.log('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  const last = () => {
    bluetick();
    reset();
  };
  const calltwo = () => {
    sendlastmessage();
    sendMessage();
  };

  const reset = async () => {
    await firestore()
      .collection('chatRooms')
      .doc(routeData?.discussionid?.toString())
      .update({
        lasttime: firestore.FieldValue.serverTimestamp(),
        [`unreaduser.${user?.userid}.unreadcount`]: 0,
        [`unreaduser.${user.userid}.lasttimestamp`]:
          firestore.FieldValue.serverTimestamp(),
      });
  };

  const sendlastmessage = async () => {
    await firestore()
      .collection('chatRooms')
      .doc(routeData?.discussionid?.toString())
      .update({
        lastmessage: newMessage,
        lasttime: firestore.FieldValue.serverTimestamp(),
        [`unreaduser.${routeData?.oppositeid}.unreadcount`]:
          firestore.FieldValue.increment(1),
        [`unreaduser.${user.userid}.lasttimestamp`]:
          firestore.FieldValue.serverTimestamp(),
      });
  };

  const renderMessage = ({ item }: { item: MessageseenType }) => {
    console.log('loggggg:', routeData?.currlastime.toDate().toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            }));

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignSelf: item.senderId === user?.userid ? 'flex-end' : 'flex-start',
          margin: 5,
          backgroundColor:
            item.senderId === user?.userid
              ? Colors.userchatclr
              : Colors.frndchatclr,
          maxWidth: '80%',
          borderRadius: 10,
          paddingHorizontal: 12,
          paddingVertical: 4,
          marginRight: item.senderId === user?.userid ? 10 : null,
          marginLeft: item.senderId === user?.userid ? null : 10,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              padding: 5,
              fontSize: 14,
            }}
          >
            {item.text}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignSelf: 'flex-end',
            flexDirection: 'row',
            columnGap: 5,
          }}
        >
          <AppText
            text={item.timestamp?.toDate()?.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })}
            type={'timestamptxt'}
            style={styles.timestampText}
          />
          
          {item.senderId === user?.userid &&<Image
        
            source={image.doubletick}
            style={{ height: 20, width: 20 }}
            {...(item.status === 'seen' && {
              tintColor: '#3d77e2ff',
            })}
          />}
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={keyboardOffset}
    >
      <View style={styles.heaaderstyle}>
        <View style={styles.view1sub}>
          <Appbackbtn
            Style={styles.backbtnstyle}
            source={image.backarrows}
            style={styles.backbtnstyle1}
            Onpress={() => console.log('back')}
          />
          
          <Image source={image.whiteimg} style={styles.avatar} />
          <View>
          <AppText text={routeData?.chatnamescrn!} type={'chatpeople'} />
          <AppText text={`last seen ${routeData?.currlastime.toDate().toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })}`} type={'500-14'} />
        </View>
        </View>
       

        <View style={styles.view2sub}>
          <AppImage source={image.videoicon} style={styles.callicon} />
          <AppImage source={image.callicon} style={styles.callicon} />
          <AppImage source={image.threedot} style={styles.callicon} />
        </View>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        onEndReached={loadMoreMessages}
        onStartReached={last}
        onEndReachedThreshold={0.5}
        inverted
      />

      <View style={styles.view2}>
        <View style={styles.textinputview}>
          <AppTextInput
            onChangeText={setNewMessage}
            value={newMessage}
            placeholder={'Message...'}
            style={styles.textinput}
          />
          <Appbackbtn
            Onpress={calltwo}
            source={image.sendicon}
            style={styles.sendiconstyle}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view1sub: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heaaderstyle: {
    flexDirection: 'row',

    //  borderBottomWidth: 1,
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
  timestampText: {
    fontSize: 10,
    color: Colors.timestampText,
    // marginLeft: 3,
    // alignItems: 'flex-end',
  },
  view2sub: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 15,
    justifyContent: 'flex-end',
  },
  view2: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  backbtnstyle1: {
    height: 36,
    width: 36,
  },
  textinputview: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    backgroundColor: Colors.textinputcolor,
    shadowColor: '#1e1b1bff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    borderBottomWidth: 0,
    shadowRadius: 3,
    justifyContent: 'space-around',
  },
  textinput: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginStart: 10,
    height: 55,
    width: 320,
    borderColor: '#90988dff',
    borderWidth: 1,
  },
  sendiconstyle: {
    height: 32,
    transform: [{ rotate: '330deg' }],
    width: 32,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  backarrrowview: {
    width: 2,
    height: 24,
    backgroundColor: 'white',
  },
  backbtnstyle: {
    paddingVertical: 5,
    paddingHorizontal: 1,
  },
});
