/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { Colors } from '../utils/Colors';
import { setlogout } from '../redux/AuthSlice';

const UserDetailsScreen = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      dispatch(setlogout());
      console.log('User signed out successfully!');
    } catch (error) {
      console.error('Error signing out:', error);
    }
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
