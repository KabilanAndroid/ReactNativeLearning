import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef } from 'react';

const { width } = Dimensions.get('window');

const Animation2 = () => {
  const MoveAnim = useRef(new Animated.Value(0)).current;
  const ColorAnim = useRef(new Animated.Value(0)).current; 

  const click = () => {
    Animated.parallel([ 
      Animated.timing(MoveAnim, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      }),
      Animated.timing(ColorAnim, {
        toValue: 1,
        duration: 5000, 
        useNativeDriver: true,
      }),
    ]).start(() => {
  
    });
  };

  const animatedStyle = {
    transform: [
      {
        translateX: MoveAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, width - 100],
        }),
      },
    ],
    backgroundColor: ColorAnim.interpolate({ 
      inputRange: [0, 0.20,0.40,0.60,0.80, 1], 
      outputRange: ['red', 'blue', 'green','orange','yellow','black'], 
    }),
  };

  return (
    <View style={styles.continer}>
      <TouchableOpacity onPress={click}>
        <Text>click</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.box, animatedStyle]} />
    </View>
  );
};

export default Animation2;

const styles = StyleSheet.create({
  continer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  box: {
    height: 100,
    width: 100,
  },
});