import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from './src/components/Pages/SignupScreen';
import Homescreen from './src/components/Pages/Homescreen';
import { UserProvider } from './src/components/Pages/UserContext';


type RoutescreenTypes = {
  Home: undefined;
  signup: undefined;
};

const Stack = createNativeStackNavigator<RoutescreenTypes>();

function RootStack() {
  return (
    <UserProvider>
      <Stack.Navigator initialRouteName="signup">
        <Stack.Screen name="Home" component={Homescreen} />
        <Stack.Screen
          name="signup"
          component={SignupScreen}
          options={{
            headerStyle: {
              backgroundColor: '#636B2F',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
      
    </UserProvider>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}