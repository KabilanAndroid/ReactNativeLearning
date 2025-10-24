import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import type { RootState } from '../../redux/store';
import { IconButton } from 'react-native-paper';
import { setLoginStatus } from '../../redux/slice/userActions';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const signupData = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    if (email === signupData.email && password === signupData.password) {
      dispatch(setLoginStatus(true));
      console.log(setLoginStatus);
    } else {
      Alert.alert('Invalid Credentials', 'Email or password is incorrect');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <IconButton
            icon={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            iconColor="#555"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('signup' as never)}
        >
          <Text style={styles.link}>Don’t have an account? Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(setLoginStatus(true))}>
          <Text>Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flexGrow: 1,
    backgroundColor: '#CCCCFF',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    height: 50,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: '#5C5C99',
    paddingVertical: 15,
    borderRadius: 6,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    textAlign: 'center',
    marginTop: 15,
    color: '#0000CC',
  },
});
