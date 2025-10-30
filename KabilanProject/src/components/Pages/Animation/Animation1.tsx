import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { image } from '../../../utils/Images';

const Animation1 = () => {
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const RotateAnim = useRef(new Animated.Value(0)).current;
  const [isEnabled, setIsEnabled] = useState(false);
  const [dynheight, setdynheight] = useState(0);

  const toggleAnimation = () => {
    setIsEnabled(_ => !_);
    Animated.timing(animatedHeight, {
      toValue: isEnabled ? 0 : dynheight,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  useEffect(() => {
    Animated.timing(RotateAnim, {
      toValue: isEnabled ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isEnabled, RotateAnim]);

  const handleLayout = (event: LayoutChangeEvent) => {
    if (dynheight === 0) {
      setdynheight(event.nativeEvent.layout.height);
    }
  };
  const rotateStyle = RotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.clickbutton} onPress={toggleAnimation}>
        <Text style={styles.text}>Press Me</Text>
        <Animated.Image
          source={image.uparrow}
          style={[
            styles.image,

            {
              transform: [
                {
                  rotate: rotateStyle,
                },
              ],
            },
          ]}
        />
        
      </TouchableOpacity>

      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ opacity: 0, position: 'absolute' }}
        onLayout={handleLayout}
      >
        <Text style={styles.text}>Kabilan</Text>
        <Text style={styles.text}>Kabilan</Text>
      </View>

      <Animated.View style={[styles.box, { height: animatedHeight }]}>
        <Text style={styles.text}>Kabilan</Text>
        <Text style={styles.text}>Kabilan</Text>
      </Animated.View>

      <View style={styles.box1} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffefeff',
    alignItems: 'flex-start',
  },
  clickbutton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'skyblue',
    width: '50%',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignSelf: 'center',
    marginVertical: 10,
  },
  box: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: 'skyblue',
  },
  text: {
    fontSize: 16,
    color: 'darkblue',
  },
  image: {
    width: 18,
    height: 18,
  },
  image2: {
    transform: [{ rotate: '90deg' }],
    width: 18,
    height: 18,
  },
  box1: {
    height: '50%',
    width: '100%',
    backgroundColor: 'lightgreen',
  },
});

export default Animation1;
