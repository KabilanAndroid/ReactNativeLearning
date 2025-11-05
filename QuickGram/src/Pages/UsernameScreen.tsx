import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUsernameStatus } from '../redux/UserAction';
import UsernameForm from '../Components/UsernameForm';

const UsernameScreen = () => {
  const [username, setUsername] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = auth().currentUser;

  const saveUsername = async () => {
    if (!username.trim()) {
      Alert.alert('Username is required');
      return;
    }

    try {
      const usersRef = firestore().collection('UserDetails');
      const snapshot = await usersRef.where('username', '==', username).get();
      if (!snapshot.empty) {
        Alert.alert('That username is already taken.');
        return;
      }

      await usersRef.doc(user?.uid).set({
        username: username,
        email: user?.email,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      await user?.updateProfile({ displayName: username }).then(()=>{
      dispatch(setUsernameStatus(true));
      })
  
      navigation.navigate('Home' as never);
    } catch (error) {
      console.error(error);
      Alert.alert('An error occurred while saving profile.');
    }
  };

  return (
    <View>
      <UsernameForm/>
      <TextInput
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />
      <Text>user id:{user?.uid}</Text>
      <Button title="Save and Continue" onPress={saveUsername} />
    </View>
  );
};

export default UsernameScreen;
