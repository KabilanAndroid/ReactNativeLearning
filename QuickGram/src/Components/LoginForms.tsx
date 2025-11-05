/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Apptextbutton from '../atoms/Apptextbutton';
import AppText from '../atoms/AppText';
import firestore from '@react-native-firebase/firestore';
import { setLoginStatus, setUsernameStatus } from '../redux/UserAction';

import AppTextInput from '../atoms/AppTextInput';
import { firebase } from '@react-native-firebase/auth';
import LoginButton from '../atoms/LoginButton';
import { Colors } from '../utils/Colors';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

const LoginForms = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('Kabilan@2003');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'email':
        if (!value.trim()) error = 'Email is required';
        else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value.trim())) error = 'Email is invalid';
        }
        break;
      case 'password':
        if (!value) error = 'Password is required';
        else if (value.length < 6)
          error = 'Password must be at least 6 characters';
        break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };
  const validate = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = 'Email is invalid';
        valid = false;
      }
    }

    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const login1 = async () => {
    if (validate()) {
      try {
        const res = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        console.log(res);

        if (res.user.uid) {
          dispatch(setLoginStatus(true));
          console.log('Fetching document for UID:', res.user.uid);

          const userDoc = await firestore()
            .collection('UserDetails')
            .doc(res.user.uid)
            .get();

          console.log('Document snapshot received:', userDoc);
          if (userDoc.exists() && userDoc.data()?.username) {
            console.log("Userdata:",userDoc?.data()?.username);
            dispatch(setUsernameStatus(true));
          } else {
            dispatch(setUsernameStatus(false));
          }
        }
      } catch (error: any) {
        if (error.code === 'auth/user-not-found') {
          Alert.alert('Error', 'No user found with this email.');
        } else if (error.code === 'auth/wrong-password') {
          Alert.alert('Error', 'Incorrect password.');
        } else {
          Alert.alert('Error', error.message);
        }
      }
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.cardinsidecard}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <AppText text={'Login'} type={'LoginText'} />
        <View style={styles.textinsideview1}>
          <AppText text={'User name'} type={'userText'} />
        </View>
        <View style={styles.textinput1}>
          <AppTextInput
            onChangeText={text => {
              setEmail(text);
              validateField('email', text);
            }}
            value={email}
            placeholder={'Email'}
            style={styles.textinput}
            props={{
              keyboardType: 'email-address',
            }}
          />
        </View>
        {errors.email ? (
          <Text style={styles.errorText}>{errors.email}</Text>
        ) : null}
        <View style={styles.textinsideview2}>
          <AppText text={'Password'} type={'userText'} />
        </View>
        <View style={styles.textinput2}>
          <AppTextInput
            onChangeText={text => {
              setPassword(text);
              validateField('password', text);
            }}
            value={password}
            placeholder={'Password'}
            style={styles.textinput}
            props={{
              secureTextEntry: true,
            }}
          />
        </View>
        {errors.password ? (
          <Text style={styles.errorText}>{errors.password}</Text>
        ) : null}
        <View style={styles.forgetpass}>
          <Apptextbutton
            text={'Forget password'}
            Style={{}}
            Onpress={function (): void {
              console.log('hello');
            }}
          />
        </View>
        <View style={styles.loinbtnview}>
          <LoginButton
            text={'Login'}
            Style={styles.loginButton}
            Onpress={function (): void {
              login1();
            }}
          />
        </View>
        <View style={styles.imageviewinsideview}>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <AppText text={`Don't have an account?`} type={'donthave'} />
            <Apptextbutton
              text={'Sign up'}
              textType="signupfont"
              Onpress={function (): void {
                navigation.navigate('signup' as never);
              }}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginForms;

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
    paddingVertical: 15,
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
    height: '100%',
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
