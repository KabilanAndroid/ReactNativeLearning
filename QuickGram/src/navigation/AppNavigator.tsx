import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { HomeNavigator } from './HomeStack';
import { AuthNavigator } from './AuthStack';


const AppNavigator = ({ isLoggedIn }:any) => {
  return (
    <NavigationContainer>
      {isLoggedIn ? <HomeNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
