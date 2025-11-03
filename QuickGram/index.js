/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
// import { Firebase } from '@react-native-firebase/app';

// const firebaseConfig = {
//   apiKey: 'AIzaSyAqlF83n88weeCqLejkG8fSihiXeHj0vZk',
//   authDomain: 'YOUR_AUTH_DOMAIN',
//   projectId: 'quickgram-e7247',
//   storageBucket: 'quickgram-e7247.firebasestorage.app',
//   messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
//   appId: 'YOUR_APP_ID',
// };

// Firebase.initializeApp(firebaseConfig);

AppRegistry.registerComponent(appName, () => App);
