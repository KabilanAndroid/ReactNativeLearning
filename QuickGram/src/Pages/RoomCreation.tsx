/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {  View } from 'react-native';

import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import AppButton from '../atoms/AppButton';
const user = auth().currentUser;
console.log(user);

function HomeScreen() {
  const navigation = useNavigation();
  const handleCreateRoom = async () => {
    // const userAId = user?.uid;
    // const userBId = 'Q2o5nck0ZOZYhjznX7nsFRkxJFx1';

    try {
    //   const roomId = await createTwoUserRoom(userAId, userBId);
    //   console.log('Navigating to chat room:', roomId);
      navigation.navigate('chatDiscuss' as never);
    } catch (error) {
      console.error('Failed to create room:', error);
    }
  };

  return (
    <View style={{justifyContent:'center', flex:1}}>
      
      <AppButton text={'go to chat'} Onpress={handleCreateRoom } Style={{backgroundColor:'black' ,width:200,marginStart:100}} />
    </View>
  );
}

export default HomeScreen;
