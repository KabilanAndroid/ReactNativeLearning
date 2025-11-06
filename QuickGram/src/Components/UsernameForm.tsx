import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useState } from 'react';

import { Colors } from '../utils/Colors';
import auth from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';
import AppText from '../atoms/AppText';
import AppTextInput from '../atoms/AppTextInput';
import LoginButton from '../atoms/LoginButton';

import { setUsernameStatus } from '../redux/UserAction';
import { useDispatch } from 'react-redux';


  const UsernameForms = () => {

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
  }


  return (
     <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.cardinsidecard}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
        <AppText text={'set username'} type={'LoginText'} />
        <View style={styles.textinsideview1}>
          <AppText text={''} type={'userText'} />
        </View>
        <View style={styles.textinput1}>
          <AppTextInput
            value={username}
        onChangeText={setUsername}
            placeholder={'username'}
            style={styles.textinput}
          />
        </View>
        {errors.username ? (
          <Text style={styles.errorText}>{errors.username}</Text>
        ) : null}

        <View style={styles.loinbtnview}>
          <LoginButton
            text={'set'}
            Style={styles.loginButton}
            Onpress={function (): void {
              saveUsername();
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>

  );
};


export default UsernameForms;

const styles = StyleSheet.create({
  forgetpass: {
    alignSelf: 'flex-end',
  },
  imageviewinsideview: {
    paddingVertical: 20,
    alignSelf: 'center',
  },

  loinbtnview: {
    marginTop: 30,
  },
  textinput1: {
    paddingVertical: 5,
    width: '100%',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 5,
  },
  textinput2: {
    paddingVertical: 15,
  },
  textinsideview1: {
    paddingTop: 30,
    paddingHorizontal: 16,
  },
  textinsideview2: {
    paddingTop: 5,
    paddingHorizontal: 16,
  },
  loginButton: {
    backgroundColor: Colors.loginclr,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
  },
  textinput: {
    backgroundColor: 'white',
    borderRadius: 20,
    height: 45,
    borderColor: '#000',
    borderWidth: 1,

    paddingHorizontal: 30,
  },

  cardinsidecard: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 20,
    shadowColor: '#000000ff',
    paddingHorizontal: 8,
    paddingVertical: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  imageview: {
    flex: 1,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#d7d7d746',
  },
  images: {
    height: '100%',
    width: '100%',
  },
  card: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    paddingVertical: 120,
    paddingHorizontal: 20,
    backgroundColor: '#f6f1f146',
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  whiteview: {
    flex: 1,
    backgroundColor: Colors.loginbg,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
