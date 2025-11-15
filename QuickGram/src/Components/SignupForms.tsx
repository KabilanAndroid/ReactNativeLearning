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
import auth from '@react-native-firebase/auth';
import AppText from '../atoms/AppText';
import AppTextInput from '../atoms/AppTextInput';
import LoginButton from '../atoms/LoginButton';
import { Colors } from '../utils/Colors';
import Apptextbutton from '../atoms/Apptextbutton';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setlogin, setusernamefalse } from '../redux/AuthSlice';
import { ScreenType } from '../utils/Types';

const SignupForms = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<ScreenType>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('Kabilan@2003');
  const [rePassword, setRePassword] = useState<string>('Kabilan@2003');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    rePassword: '',
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
      case 'rePassword':
        if (!value) error = 'Please confirm your password';
        else if (value.length < 6)
          error = 'Password must be at least 6 characters';
        else if (value !== password) error = 'Passwords do not match';
        break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validate = () => {
    let valid = true;
    const newErrors = { email: '', password: '', rePassword: '' };

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

    if (!rePassword) {
      newErrors.rePassword = 'Please confirm your password';
      valid = false;
    } else if (rePassword.length < 6) {
      newErrors.rePassword = 'Password must be at least 6 characters';
      valid = false;
    } else if (rePassword !== password) {
      newErrors.rePassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignUp = async () => {
    console.log('hiii');

    console.log('validdate', validate());

    if (validate()) {
      console.log('testing');

      try {
        console.log('kabilan');

        const res = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        if (res.user.uid) {
          
          dispatch(setlogin(res.user.uid));
          dispatch(setusernamefalse());
        }
        console.log('res', res);
      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Error', 'That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('Error', 'That email address is invalid!');
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
        <AppText text={'Signup'} type={'LoginText'} />
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
              autoCapitalize: 'none',
              keyboardType: 'email-address',
            }}
          />
          {errors.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
          ) : null}
        </View>
        <View style={styles.textinsideview2}>
          <AppText text={'Password'} type={'userText'} />
        </View>
        <View style={styles.textinput2}>
          <AppTextInput
            onChangeText={text => {
              setPassword('');
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
        <View style={styles.textinsideview2}>
          <AppText text={'Confirm Password'} type={'userText'} />
        </View>
        <View style={styles.textinput2}>
          <AppTextInput
            onChangeText={text => {
              setRePassword('');
              validateField('rePassword', text);
            }}
            value={rePassword}
            placeholder={'confirm-password'}
            style={styles.textinput}
            props={{
              secureTextEntry: true,
            }}
          />
        </View>
        {errors.rePassword ? (
          <Text style={styles.errorText}>{errors.rePassword}</Text>
        ) : null}
        <View style={styles.loinbtnview}>
          <LoginButton
            text={'Signup'}
            Style={styles.loginButton}
            Onpress={function (): void {
              handleSignUp();
            }}
          />
        </View>
        <View style={styles.imageviewinsideview}>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <AppText text={`already have an account?`} type={'donthave'} />
            <Apptextbutton
              text={'login here'}
              textType="signupfont"
              Onpress={function (): void {
                navigation.navigate('loginscreen');
              }}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupForms;

const styles = StyleSheet.create({
  imageviewinsideview: {
    paddingVertical: 20,
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 5,
  },

  loinbtnview: {
    marginTop: 30,
  },
  textinput1: {
    paddingVertical: 15,
    width: '100%',
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
    // height:'10%',
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

  card: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    paddingVertical: 120,
    paddingHorizontal: 20,
    marginVertical: 20,
    backgroundColor: '#f6f1f146',
  },
});
