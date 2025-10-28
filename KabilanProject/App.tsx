import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './src/redux/store';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SignupScreen from './src/components/Pages/SignupScreen';
import LoginScreen from './src/components/Pages/LoginScreen';
import Homescreen from './src/components/Pages/Homescreen';
import ApiScreen from './src/components/Pages/Api/ApiScreen';
import Animation1 from './src/components/Pages/Animation/Animation1';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{
      headerStyle: { backgroundColor: '#5C5C99' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    }}
  >
    <Stack.Screen
      name="signup"
      component={SignupScreen}
      options={{ title: 'Sign Up' }}
    />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ title: 'Login' }}
    />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerStyle: { backgroundColor: '#5C5C99' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    }}
  >
    <Stack.Screen
      name="Home"
      component={Animation1}
      options={{ title: 'Home' }}
    />
  </Stack.Navigator>
);

const App = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const isLoggedIn = authState.isLoggedIn;

  useEffect(() => {
    console.log('Authentication state changed:', authState);
  }, [authState]);

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default App;
