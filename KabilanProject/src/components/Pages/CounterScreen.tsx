import React, { useState, useCallback } from 'react';
import { View, Text, Button } from 'react-native';

const Child = React.memo(({ onPress }) => {
  console.log('Child rendered');

  return <Button title="Click me" onPress={onPress} />;
});

const UseCallbackExample = () => {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(false);

  // Without useCallback, this function would be recreated on every render
  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []); // no dependencies, so function reference never changes

  return (
    <View style={{ padding: 20 }}>
      <Text>Count: {count}</Text>
      <Child onPress={increment} />

      <Button
        title="Toggle other state"
        onPress={() => setOtherState(prev => !prev)}
      />
      <Text>Other state: {otherState ? 'ON' : 'OFF'}</Text>
    </View>
  );
};

export default UseCallbackExample;
