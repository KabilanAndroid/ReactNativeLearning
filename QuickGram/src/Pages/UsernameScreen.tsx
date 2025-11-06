import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUsernameStatus } from '../redux/UserAction';

const UsernameScreen = () => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    username: '',
  });
  const user = auth().currentUser;
  const validate = () => {
    let valid = true;
    const newErrors = { username: '' };

    if (!username.trim()) {
      newErrors.username = 'username is required';
      valid = false;
    } else {
      const emailRegex = /^[a-zA-Z][a-zA-Z0-9_]{5,19}$/;
      if (!emailRegex.test(username.trim())) {
        newErrors.username = 'username is invalid';
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };
  const saveUsername = async () => {
    if (validate()) {
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

        await user?.updateProfile({ displayName: username }).then(() => {
          dispatch(setUsernameStatus(true));
        });

      } catch (error) {
        console.error(error);
        Alert.alert('An error occurred while saving profile.');
      }
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />
      {errors.username ? (
        <Text style={styles.errorText}>{errors.username}</Text>
      ) : null}
      <Text>user id:{user?.uid}</Text>
      <Button title="Save and Continue" onPress={saveUsername} />
    </View>
  );
};

export default UsernameScreen;
const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 5,
  },
});
