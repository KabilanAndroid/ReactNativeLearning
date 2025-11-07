import { Image, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../utils/Colors';
import AppText from '../atoms/AppText';
import { image } from '../utils/Images';
import Appbackbtn from '../atoms/Appbackbtn';
import AppTextInput from '../atoms/AppTextInput';
import AppImage from '../atoms/AppImage';
import auth from '@react-native-firebase/auth';


const ChatScreen = () => {
  const [inputmessage, setinputmessage] = useState('');
  const [sendedmessage, setsendedmessage] = useState('');

  // const user = auth().currentUser;
  const sendmessage =() =>{
    setsendedmessage(inputmessage);
  }
  // const sendmessage = async (senderId, receiverId) => {
  //   setsendedmessage(inputmessage);
  //   try {
  //     const chatId = [user, 'Q2o5nck0ZOZYhjznX7nsFRkxJFx1'].sort().join('_');

  //     const chatRef = firestore().collection('chats').doc(chatId);
  //     const messagesRef = chatRef.collection('messages');

  //     await messagesRef.add({
  //       senderId: user,
  //       receiverId: 'Q2o5nck0ZOZYhjznX7nsFRkxJFx1',
  //       text: { inputmessage },
  //       timestamp: firestore.FieldValue.serverTimestamp(),
  //       read: false,
  //     });
  //     console.log('Message sent successfully!');
  //   } catch (error) {
  //     console.error('Error sending message:', error);
  //   }
  // };

  return (
    <View style={styles.container}>
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
      <View style={styles.view2}>
        <AppText text={sendedmessage} type={'chatpeople'} />
        <View style={styles.textinputview}>
          <AppTextInput
            onChangeText={setinputmessage}
            value={inputmessage}
            placeholder={''}
            style={styles.textinput}
          />
          <Appbackbtn
            Onpress={sendmessage}
            source={image.sendicon}
            style={styles.sendiconstyle}
          />
        </View>
      </View>
    </View>
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
  view2sub: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 15,
    justifyContent: 'flex-end',
  },
  view2: {
    justifyContent: 'flex-end',
    flex: 1,
    alignItems: 'flex-end',

    backgroundColor: Colors.chatinscreen,
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
    backgroundColor: Colors.chatinscreen,
    justifyContent: 'space-around',
  },
  textinput: {
    backgroundColor: 'white',
    borderRadius: 20,
    height: 45,
    width: 360,
    borderColor: '#000',
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
