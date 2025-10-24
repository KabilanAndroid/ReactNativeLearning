import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import { setSignupData } from '../../redux/slice/userActions';

// import { UserContext } from './UserContext';

const SignupScreen = () => {
  // const { setUserData } = useContext<any>(UserContext);

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rePassword, setRePassword] = useState<string>('');

  const dispatch = useDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRePasswordVisible, setIsRePasswordVisible] = useState(false);
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    rePassword: '',
  });
  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'username':
        if (!value.trim()) error = 'Username is required';
        else if (value.trim().length < 3)
          error = 'Username must be at least 3 characters';
        break;
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
    const newErrors = { username: '', email: '', password: '', rePassword: '' };

    if (!username.trim()) {
      newErrors.username = 'Username is required';
      valid = false;
    } else if (username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
      valid = false;
    }

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
  // const userData = {
  //   username,
  //   email,
  //   password,
  //   rePassword,
  // };
  // const MyContext = createContext(userData)

  const navigation = useNavigation();
  const onPress = () => {
    if (validate()) {
      // const data = { username, email };
      // setUserData(data);
      dispatch(setSignupData(username, password, email, rePassword));

      navigation.navigate('Login' as never);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Create your account</Text>

        <TextInput
          style={[styles.input, errors.username && styles.errorInput]}
          placeholder="Username"
          value={username}
          onChangeText={text => {
            setUsername(text);
            validateField('username', text);
          }}
        />
        {errors.username ? (
          <Text style={styles.errorText}>{errors.username}</Text>
        ) : null}

        <TextInput
          style={[styles.input, errors.email && styles.errorInput]}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={text => {
            setEmail(text);
            validateField('email', text);
          }}
        />
        {errors.email ? (
          <Text style={styles.errorText}>{errors.email}</Text>
        ) : null}

        <View style={styles.passwordInputContainer}>
          <TextInput
            style={[styles.passwordInput, errors.password && styles.errorInput]}
            placeholder="Password"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={text => {
              setPassword(text);
              validateField('password', text);
              validateField('rePassword', rePassword);
            }}
          />
          <IconButton
            icon={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            iconColor="#555"
          />
        </View>
        {errors.password ? (
          <Text style={styles.errorText}>{errors.password}</Text>
        ) : null}

        <View style={styles.passwordInputContainer}>
          <TextInput
            style={[
              styles.passwordInput,
              errors.rePassword && styles.errorInput,
            ]}
            placeholder="Confirm Password"
            secureTextEntry={!isRePasswordVisible}
            value={rePassword}
            onChangeText={text => {
              setRePassword(text);
              validateField('rePassword', text);
            }}
          />
          <IconButton
            icon={isRePasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            onPress={() => setIsRePasswordVisible(!isRePasswordVisible)}
            iconColor="#555"
          />
        </View>
        {errors.rePassword ? (
          <Text style={styles.errorText}>{errors.rePassword}</Text>
        ) : null}

        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

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
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#5C5C99',
    paddingVertical: 15,
    borderRadius: 6,
    marginTop: 10,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
