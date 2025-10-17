import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { View, Text, Button } from 'react-native';
import { decrement, increment, counterState } from './src/redux/slice/counterSlice';

const App = () => {
  const count = useSelector(state=>state);
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Redux Example</Text>
      <Text>Count: {count}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
    </View>
  );
};

export default App;