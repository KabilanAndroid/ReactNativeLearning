/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  Animated,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { MessageseenType, MessageType, ScreenType } from '../utils/Types';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useAppSelector } from '../redux/ReduxHook';
import { Colors } from '../utils/Colors';
import HearderStyle from '../atoms/HearderStyle';
import ChatBubble from '../atoms/ChatBubble';
import ChatInput from '../atoms/ChatInput';
import { Chip } from 'react-native-paper';
import AppText from '../atoms/AppText';

/*--------------------------------------Chatscreen----------------------------------------- */

const ChatScreen = () => {
  const [lastvisible, setlastvisible] = useState<Partial<MessageType>>();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [keybrd, setKeyboardVisible] = useState(Boolean);
  const [newMessage, setNewMessage] = useState('');
  const [editing, setediting] = useState(false);
  const chatid = useRef<string | undefined>('');
  const lastid = useRef('');
  const user = useAppSelector(state => state.auth);
  const [highlightColor, setHighlightColor] = useState('#c2e7e6ff');
  const route = useRoute<RouteProp<ScreenType>>();
  const routeData = route.params;

  /*-------------------------------------Keyboard and touch handling------------------------------------------ */

  const handlePressIn = () => {
    setHighlightColor('#c2e7e6ff');
  };
  const handlePressOut = () => {
    setHighlightColor('#c2e7e6ff');
  };
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
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  /*-------------------------------------first load of message in chat------------------------------------------ */

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

  /*---------------------------------------load more message of pagination---------------------------------------- */

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

  // ?.toLocaleTimeString('en-US', {
  //           hour: 'numeric',
  //           minute: 'numeric',
  //           hour12: true,
  //         })
  /*-----------------------------------bluetick operation-------------------------------------------- */

  /*-----------------------------------bluetick operation-------------------------------------------- */

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

  /*------------------------------------ Sending new message------------------------------------------- */

  const sendMessage = async () => {
    getfinalid();
    if (newMessage.trim() === '' || !user) {
      return;
    }
    /*-------------------------editing message-------------------------- */
    if (editing) {
      if (chatid.current === lastid.current) {
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
        setNewMessage('');
      }
      await firestore()
        .collection('chatRooms')
        .doc(routeData?.discussionid)
        .collection('messages')
        .doc(chatid.current)
        .update({
          text: newMessage,
          editedAt: firestore.FieldValue.serverTimestamp(),
        });

      setNewMessage('');
      setediting(false);
      /*--------------------------------------------------------------------- */
    } else {
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
          deleted: false,
        });
      getfinalid();
      setNewMessage('');
      console.log('Message sent successfully!');
    }
  };

  /*---------------------------------calling functions---------------------------------------------- */

  const last = () => {
    bluetick();
    reset();
  };
  const calltwo = () => {
    sendlastmessage();
    sendMessage();
  };

  /*------------------------------------getting final id------------------------------------------- */

  useEffect(() => {
    getfinalid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getfinalid = async () => {
    const querySnapshot = await firestore()
      .collection('chatRooms')
      .doc(routeData?.discussionid?.toString())
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .limit(1)
      .get();
    const moreMessages = querySnapshot.docs.map(
      doc =>
        ({
          id: doc.id,
          ...doc.data(),
        } as MessageType),
    );

    lastid.current = moreMessages[0]?.id;
    console.log('fsdioninsdi:', moreMessages);
  };

  /*-------------------------------------resetting read count------------------------------------------ */

  const reset = async () => {
    await firestore()
      .collection('chatRooms')
      .doc(routeData?.discussionid?.toString())
      .update({
        [`unreaduser.${user?.userid}.unreadcount`]: 0,
        [`unreaduser.${user.userid}.lasttimestamp`]:
          firestore.FieldValue.serverTimestamp(),
      });
  };

  /*------------------------------------delete operation------------------------------------------- */

  const handledelete = (
    currmessage: string | undefined,
    currtext: React.SetStateAction<string>,
  ) => {
    console.log('callinglll');

    setNewMessage('');
    Alert.alert(
      'modify',
      'Are you sure you want to manipulate this message?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Deletion cancelled'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            console.log('curentselect :', currmessage);
            console.log('curentidlast :', lastid);
            if (currmessage === lastid.current) {
              await firestore()
                .collection('chatRooms')
                .doc(routeData?.discussionid?.toString())
                .update({
                  lastmessage: '🚫 this message was deleted',
                  lasttime: firestore.FieldValue.serverTimestamp(),
                  [`unreaduser.${routeData?.oppositeid}.unreadcount`]:
                    firestore.FieldValue.increment(1),
                  [`unreaduser.${user.userid}.lasttimestamp`]:
                    firestore.FieldValue.serverTimestamp(),
                });
            }

            await firestore()
              .collection('chatRooms')
              .doc(routeData?.discussionid)
              .collection('messages')
              .doc(currmessage)
              .update({
                deleted: true,
              });
            console.log('Message deleted successfully!');
          },
          style: 'destructive',
        },
        {
          text: 'Edit',
          onPress: async () => {
            setediting(true),
              setNewMessage(currtext),
              (chatid.current = currmessage);
            // sendMessage();
          },
        },
      ],

      { cancelable: true },
    );
  };

  /*-------------------------------------last message ------------------------------------------ */

  const sendlastmessage = async () => {
    if (!newMessage.trim()) {
    } else {
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
    }
  };

  /*------------------------------------rendering message in chat------------------------------------------- */
  const getdate = (date: {
    getFullYear: () => any;
    getMonth: () => any;
    getDate: () => any;
  }) => {
    return `${date?.getFullYear()}-${date?.getMonth()}-${date?.getDate()}`;
  };

  const renderMessage = ({
    item,
    index,
  }: {
    item: MessageseenType;
    index: number;
  }) => {
    const currid = item.senderId === user.userid;

    const previousItem = messages[index + 1];
    var dateToday = new Date();
    var yesterday = new Date();
    yesterday.setDate(dateToday?.getDate() - 1);

    const curr_date = item?.timestamp?.toDate();
    const previous = previousItem?.timestamp?.toDate();

    console.log(
      'curent ->',
      item?.text,
      
      'prev->',
      previousItem?.text,
      
      getdate(curr_date) == getdate(yesterday),
    );
const isNewDay =
    !previous || getdate(curr_date) !== getdate(previous);

  let label = null;
  if (isNewDay) {
    if (getdate(curr_date) === getdate(dateToday)) label = "Today";
    else if (getdate(curr_date) === getdate(yesterday)) label = "Yesterday";
    else label = getdate(curr_date);
  }
    if (currid && item.deleted === false) {
      return (
      <View style={{}}>
        <View style={{alignItems:'center'}}>
            {
             getdate(curr_date) !== getdate(previous) ? (
              getdate(curr_date) === getdate(dateToday) ? (
                <Chip mode="outlined">Today</Chip>
                
              ) : getdate(curr_date) === getdate(yesterday) ? (
                <Chip mode="outlined">Yesterday</Chip>
              ) : (
                <Chip mode="outlined">{getdate(curr_date)}</Chip>
              
              )
            ) : null
            }
            </View>
          <TouchableHighlight
            underlayColor={highlightColor}
            activeOpacity={0.6}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onLongPress={() => handledelete(item.id, item.text)}
          >
            <ChatBubble item={item} previousItem={previousItem} />
          </TouchableHighlight>
        </View>
      );
    } else {
      return (
     <View style={{ }}>
      <View style={{alignItems:'center'}}>
           {
            getdate(curr_date) !== getdate(previous) ? (
             getdate(curr_date) === getdate(dateToday) ? (
               <Chip mode="outlined">Today</Chip>
               
             ) : getdate(curr_date) === getdate(yesterday) ? (
               <Chip mode="outlined">Yesterday</Chip>
             ) : (
               <Chip mode="outlined">{getdate(curr_date)}</Chip>
             
             )
           ) : null
           }
           </View>
          <ChatBubble item={item} previousItem={previousItem} />
        </View>
      );
    }
  };

  /*-------------------------------------Return------------------------------------------ */

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={keyboardOffset}
    >
      <HearderStyle />

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        onEndReached={loadMoreMessages}
        onStartReached={last}
        onEndReachedThreshold={0.5}
        inverted
      />

      <ChatInput
        setNewMessage={setNewMessage}
        newMessage={newMessage}
        editing={editing}
        sendMessage={sendMessage}
        calltwo={calltwo}
      />
    </KeyboardAvoidingView>
  );
};

/*------------------------------------------------------------------------------- */

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
