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
import auth from '@react-native-firebase/auth';
import AppTextInput from '../atoms/AppTextInput';
import AppImage from '../atoms/AppImage';
import firestore, { FieldValue, firebase, increment } from '@react-native-firebase/firestore';
import { Colors } from '../utils/Colors';
import { MessageType } from '../utils/Types';
import { useRoute } from '@react-navigation/native';

const user = auth().currentUser;

const ChatScreen = () => {
  const [lastvisible, setlastvisible] = useState<Partial<MessageType>>();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [keybrd, setKeyboardVisible] = useState(Boolean);
  const [newMessage, setNewMessage] = useState('');
  const [count,setcount] = useState(0)

  const route = useRoute();
  const routeData = route.params;
  console.log('routeparam:', routeData);

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
  const keyboardOffset = keybrd ? 30 : 0;

  useEffect(() => {
    const subscriber = firestore()
      .collection('chatRooms')
      .doc(routeData?.data?.toString())
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
        .doc(routeData?.data?.toString())
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

  const sendMessage = async () => {
    if (newMessage.trim() === '' || !user) {
      return;
    }

    try {
      await firestore()
        .collection('chatRooms')
        .doc(routeData?.data?.toString())
        .collection('messages')
        .add({
          text: newMessage,
          senderId: user?.uid,
          timestamp: firestore.FieldValue.serverTimestamp(),
        });
      setNewMessage('');
      console.log('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  const calltwo = () => {
    sendlastmessage();
    sendMessage();
  };


// useEffect(() => {
//     const subscriber = firestore()
//       .collection('chatRooms')
//       .doc(routeData?.data?.toString())
//       .collection('messages')
//       .orderBy('timestamp', 'desc')
//       .limit(20)
//       .onSnapshot(querySnapshot => {
//         const newMessages = querySnapshot.docs.map(
//           doc =>
//             ({
//               id: doc.id,
//               ...doc.data(),
//             } as MessageType),
//         );
//         setMessages(newMessages);
//         console.log('firstload:', newMessages);
//         const firstloadlast = querySnapshot.docs[querySnapshot.docs.length - 1];

//         console.log('first final :', firstloadlast);

//         setlastvisible(firstloadlast);
//       });
//     return () => subscriber();
//   }, [routeData]);






const reset = async() =>{
  await firestore().collection('chatRooms').doc(routeData?.data?.toString()).update({
      lastmessage: newMessage,
      lasttime: firestore.FieldValue.serverTimestamp(),
      [`unreaduser.${user?.uid}.unreadcount`]: 0
    });
}









  const sendlastmessage = async () => {
    setcount(count => count+1)
    await firestore().collection('chatRooms').doc(routeData?.data?.toString()).update({
      lastmessage: newMessage,
      lasttime: firestore.FieldValue.serverTimestamp(),
      // unreaduser:uid:routeData?.oppositeid ,unreadcount:increment(1)}
      [`unreaduser.${routeData?.oppositeid}.unreadcount`]: firestore.FieldValue.increment(1)
    });
  };

  const renderMessage = ({ item }: any) => (
    <View
      style={{
        alignSelf: item.senderId === user?.uid ? 'flex-end' : 'flex-start',
        margin: 5,
        marginRight: item.senderId === user?.uid ? 5 : 200,
        marginLeft: item.senderId === user?.uid ? 200 : 5,
      }}
    >
      <Text
        style={{
          backgroundColor:
            item.senderId === user?.uid ? '#d3f5c8ff' : '#E0E0E0',
          padding: 10,
          borderRadius: 10,
        }}
      >
        {item.text}
      </Text>
      <AppText
        text={item.timestamp?.toDate()?.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })}
        type={'timestamptxt'}
        style={styles.timestampText}
      />
    </View>
  );

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
            Onpress={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
          <Image source={image.whiteimg} style={styles.avatar} />
          <AppText text={routeData?.chatnamescrn} type={'chatpeople'} />
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
        onStartReached={reset}
        onEndReachedThreshold={0.5}
        inverted
      />

      <View style={styles.view2}>
        <AppText text={''} type={'chatpeople'} />
        <View style={styles.textinputview}>
          <AppTextInput
            onChangeText={setNewMessage}
            value={newMessage}
            placeholder={'message'}
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
    backgroundColor: Colors.introbg,
    padding: 6,
    columnGap: 100,
  },
  callicon: {
    height: 26,
    width: 26,
  },
  timestampText: {
    fontSize: 10,
    color: '#08361fff',
    marginTop: 3,
    alignSelf: 'flex-end',
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
    paddingVertical: 20,
    backgroundColor: Colors.introbg,
    justifyContent: 'space-around',
  },
  textinput: {
    backgroundColor: 'white',
    borderRadius: 20,
    height: 45,
    width: 320,
    borderColor: '#55cd1dff',
    borderWidth: 1,
  },
  sendiconstyle: {
    height: 36,
    width: 36,
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
