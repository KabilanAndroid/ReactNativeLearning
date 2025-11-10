/* eslint-disable react-native/no-inline-styles */
import { FlatList, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../utils/Colors';
import AppText from '../atoms/AppText';
import { image } from '../utils/Images';
import Appbackbtn from '../atoms/Appbackbtn';
import auth from '@react-native-firebase/auth';
import AppTextInput from '../atoms/AppTextInput';
import AppImage from '../atoms/AppImage';
import firestore from '@react-native-firebase/firestore';
const user = auth().currentUser;

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (!user) {
      console.error('User is not authenticated.');
      return;
    }

    const subscriber = firestore()
      .collection('chatRooms')
      .doc('P2RdPLa3FqyMjxANH94p')
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot(querySnapshot => {
        const fetchedMessages = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(fetchedMessages);
      });

    return () => subscriber();
  }, []);

  const sendMessage = async () => {
    if (newMessage.trim() === '' || !user) {
      return;
    }

    try {
      await firestore()
        .collection('chatRooms')
        .doc('P2RdPLa3FqyMjxANH94p')
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

  const renderMessage = ({ item }: any) => (
    <View
      style={{
        alignSelf: item.senderId === user?.uid ? 'flex-end' : 'flex-start',
        margin: 5,
      }}
    >
      <Text
        style={{
          // backgroundColor:
          //   item.senderId === user?.uid ? '#e7e2e2ff' : '#ffffffff',
          padding: 10,
          borderRadius: 10,
        }}
      >
        {item.timestamp?.toDate()?.toTimeString()}
        
      </Text>
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
    </View>
  );

  return (
    
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} 
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
          <AppText text={'Rohit Sharma'} type={'chatpeople'} />
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
      />

      <View style={styles.view2}>
        <AppText text={''} type={'chatpeople'} />
        <View style={styles.textinputview}>
          <AppTextInput
            onChangeText={setNewMessage}
            value={newMessage}
            placeholder={''}
            style={styles.textinput}
          />
          <Appbackbtn
            Onpress={sendMessage}
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
    // flex:1,
    flexDirection: 'row',
    
    // backgroundColor: Colors.introbg,
    padding: 6,
    columnGap: 100,
  },
  callicon: {
    height: 26,
    width: 26,
  },
  view2sub: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 15,
    justifyContent: 'flex-end',
  },
  view2: {
    justifyContent: 'flex-end',
    // flex: 1,
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
    backgroundColor: 'red',
    justifyContent: 'space-around',
  },
  textinput: {
    backgroundColor: 'white',
    borderRadius: 20,
    height: 45,
    width: 320,
    borderColor: '#8c12f6ff',
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
