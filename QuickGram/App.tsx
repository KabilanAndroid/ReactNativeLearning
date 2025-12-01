/* eslint-disable react-native/no-inline-styles */
import { useSelector } from 'react-redux';
import { RootState } from '../QuickGram/src/redux/Store';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import SignupScreen from './src/Pages/SignupScreen';
import LoginScreen from './src/Pages/LoginScreen';
import HomeScreen from './src/Pages/HomeScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Colors } from './src/utils/Colors';
import ChatHomeScreen from './src/Pages/ChatHomeScreen';
import ChatScreen from './src/Pages/ChatScreen';

import { Dimensions, Image } from 'react-native';
import { image } from './src/utils/Images';
import SearchScreen from './src/Pages/SearchScreen';

import { ScreenType } from './src/utils/Types';
import UsernameScreen from './src/Pages/UsernameScreen';
import NotificationScreen from './src/Pages/NotificationScreen';
import PostScreen from './src/Pages/PostScreen';
import { overlay } from 'react-native-paper';

const Stack = createNativeStackNavigator<ScreenType>();
const Tab = createBottomTabNavigator<ScreenType>();
const { width, height } = Dimensions.get('window');
const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="loginscreen"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen
      name="signupscreen"
      component={SignupScreen}
      options={{ title: 'Sign Up' }}
    />
    <Stack.Screen
      name="loginscreen"
      component={LoginScreen}
      options={{ title: 'Login' }}
    />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="maintabnavigator"
      component={MainTabNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="postscreen"
      component={PostScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="chatscreen"
      component={ChatScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="homescreen"
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: Colors.white,

        tabBarItemStyle: {
          overflow: 'hidden',
          borderRadius: 20,
          marginHorizontal: 10,
          marginVertical: 5,
          
        },

        tabBarStyle: {
          marginVertical:10,
          height: 70,
          marginHorizontal: 5,
          borderRadius: 30,
          backgroundColor: Colors.maingreen,
          
        },
        tabBarIconStyle: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="homescreen"
        component={HomeScreen}
        // eslint-disable-next-line react/no-unstable-nested-components
        options={{
          title: 'Home',
          tabBarActiveTintColor: '#5b63b7',
          tabBarInactiveTintColor: Colors.white,
          tabBarIcon: () => {
            return (
              <Image style={{ width: 40, height: 40 }} source={image.home} />
            );
          },
        }}
      />

      <Tab.Screen
        name="searchscreen"
        component={SearchScreen}
        // eslint-disable-next-line react/no-unstable-nested-components
        options={{
          title: 'Search',
          tabBarActiveTintColor: '#5b63b7',
          tabBarInactiveTintColor: Colors.white,
          tabBarIcon: () => {
            return (
              <Image style={{ width: 25, height: 25 }} source={image.search} />
            );
          },
        }}
      />

      <Tab.Screen
        name="notificationscreen"
        component={NotificationScreen}
        // eslint-disable-next-line react/no-unstable-nested-components
        options={{
          title: 'Notification',
          tabBarActiveTintColor: '#5b63b7',
          tabBarInactiveTintColor: Colors.white,
          tabBarIcon: () => {
            return (
              <Image style={{ width: 30, height: 30 }} source={image.heart} />
            );
          },
        }}
      />

      <Tab.Screen
        name="chathomescreen"
        component={ChatHomeScreen}
        // eslint-disable-next-line react/no-unstable-nested-components
        options={{
          title: 'Chat',
          tabBarActiveTintColor: '#5b63b7',
          tabBarInactiveTintColor: Colors.white,
          tabBarIcon: () => {
            return (
              <Image style={{ width: 30, height: 30 }} source={image.chat} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const RootNavigator = () => {
  const authState = useSelector((state: RootState) => state.auth);

  const hasusername = authState.hasusernames;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {hasusername ? (
        <Stack.Screen name="appstack" component={AppStack} />
      ) : (
        <Stack.Screen name="UsernameScreen" component={UsernameScreen} />
      )}
    </Stack.Navigator>
  );
};

const App = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const isLoggedIn = authState.isLoggedIn;
  console.log('isloggedin:', authState.isLoggedIn);

  return (
    <NavigationContainer>
      {isLoggedIn ? <RootNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default App;
