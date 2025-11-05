import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../Pages/LoginScreen';
import SignupScreen from '../Pages/SignupScreen';
import IntroScreen from '../Pages/IntroScreen';

const AuthStack = createNativeStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Intro" component={IntroScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
};
