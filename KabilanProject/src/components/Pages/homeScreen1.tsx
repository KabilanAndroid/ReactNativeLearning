import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { decrement, increment } from './counterSlice';
import { reset } from '../../redux/slices/counterSlice';


const HomeScreen = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>Counter: {count}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
      <Button title="Reset" onPress={() => dispatch(reset())} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counter: {
    fontSize: 32,
    marginBottom: 20,
  },
});

export default HomeScreen;
