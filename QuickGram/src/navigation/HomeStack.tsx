import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Pages/HomeScreen';
import UsernameScreen from '../Pages/UsernameScreen';

const HomeStack = createNativeStackNavigator();

export const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      initialRouteName={true ? 'UsernameScreen' : 'Home'}
      screenOptions={{ headerShown: false }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen
        name="UsernameScreen"
        component={UsernameScreen}
      />
    </HomeStack.Navigator>
  );
};
