/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { Colors } from '../utils/Colors';
import { setlogout, setusernameredux } from '../redux/AuthSlice';
import firestore from '@react-native-firebase/firestore';
import { useAppSelector } from '../redux/ReduxHook';
import { searchnewtype } from '../utils/Types';



const UserDetailsScreen = () => {
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.auth);
  const handleLogout = async () => {
    try {
      dispatch(setlogout());
      console.log('User signed out successfully!');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

 useEffect(()=>{
    getsearchitem()
  },[])


  const getsearchitem = async () => {
    const querySnapshot = await firestore().collection('UserDetails').get();
    const newMessages = querySnapshot.docs.map(
      doc =>
        ({
          id: doc.id,
          ...doc.data(),
        } as searchnewtype),
    );

     console.log('new new message:', newMessages); 
    const originalmessage = newMessages?.find(a => a.id === user.userid)?.username
    console.log("username is:",originalmessage);
    
    dispatch(setusernameredux(originalmessage))

    console.log('new original:', originalmessage);
  };

 

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: Colors.chatinscreen,
      }}
    >
      <Button title=" logout" onPress={handleLogout} />
    </View>
  );
};

export default UserDetailsScreen;
