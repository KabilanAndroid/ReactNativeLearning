import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { View, Text, Button } from 'react-native';
import { update } from './src/redux/slice/counterSlice';
import { RootState } from './src/redux/store';

const App = () => {
  const count = useSelector((state:RootState)=>state.counter.address.city)
  const dispatch = useDispatch();
  console.log(count);
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Redux Example</Text>
      <Text>Count: {count}</Text>
      <Button title="Increment" onPress={() => dispatch(update())} />
      
    </View>
  );
};

export default App;