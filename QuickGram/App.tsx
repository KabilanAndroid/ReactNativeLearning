import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../QuickGram/src/redux/Store';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import SignupScreen from './src/Pages/SignupScreen';
import LoginScreen from './src/Pages/LoginScreen';
import HomeScreen from './src/Pages/HomeScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import summa from './src/Pages/summa';
import ChatScreen from './src/Pages/ChatScreen';
import { Colors } from './src/utils/Colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{ headerShown: false }}
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

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        headerStyle:{
          backgroundColor:Colors.introbg
        },
        tabBarStyle: {
          backgroundColor:Colors.introbg,
          
        }
        
       
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home',headerTintColor:Colors.logintxt }}
        
      />

       <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{ title: 'Chat' }}
        
      />
    </Tab.Navigator>
  );
};

const RootNavigator = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const hasusername = authState.hasusername;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {hasusername ? (
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      ) : (
        <Stack.Screen name="UsernameScreen" component={summa} />
      )}
    </Stack.Navigator>
  );
};

const App = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const isLoggedIn = authState.isLoggedIn;

  useEffect(() => {
    console.log('Authentication state changed:', authState);
  }, [authState]);

  return (
    <NavigationContainer>
      {isLoggedIn ? <RootNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default App;
