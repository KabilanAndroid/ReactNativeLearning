/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { setLoginStatus } from '../redux/UserAction';

const UserDetailsScreen = () => {
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
 const dispatch = useDispatch();
  const saveUserDetails = async () => {
    const currentUser = auth().currentUser;

    if (currentUser) {
      try {
        await firestore()
          .collection('UserDetails')
          .doc(currentUser.uid)
          .set({
            username: username,
            gender: gender,
            dob: dob,
            createdAt: firestore.FieldValue.serverTimestamp(),
          }, { merge: true });

        Alert.alert('Success', 'User details saved successfully!');
      } catch (error) {
        console.error('Error saving user details:', error);
        Alert.alert('Error', 'Failed to save user details.');
      }
    } else {
      Alert.alert('Error', 'No user is currently authenticated.');
    }
  };
      const handleLogout = async () => {
      try {
        dispatch(setLoginStatus(false))
        console.log('User signed out successfully!');
      } catch (error) {
        console.error('Error signing out:', error);
      }
    };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Button title=" logout" onPress={handleLogout} />
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Enter Your Details</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Gender"
        value={gender}
        onChangeText={setGender}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Date of Birth (YYYY-MM-DD)"
        value={dob}
        onChangeText={setDob}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 20 }}
      />
      <Button title="Save Details" onPress={saveUserDetails} />
      
    </View>
  );
};

export default UserDetailsScreen;