import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';

const Animation1 = () => {
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const [isEnabled, setIsEnabled] = useState(false);
  const [dynheight, setdynheight] = useState(0);

  const toggleAnimation = () => {
    setIsEnabled(_=>!_);
    Animated.timing(animatedHeight, {
      toValue: isEnabled ? 0 : dynheight,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const handleLayout = (event: LayoutChangeEvent) => {
    
    if (dynheight === 0) {
      setdynheight(event.nativeEvent.layout.height);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.clickbutton} onPress={toggleAnimation}>
        <Text style={styles.text}>Press Me</Text>
      </TouchableOpacity>

      
      <View style={{ opacity: 0, position: 'absolute' }} onLayout={handleLayout}>
        <Text style={styles.text}>dhg</Text>
        <Text style={styles.text}>ggdgdhf</Text>
      </View>

      <Animated.View style={[styles.box, { height: animatedHeight }]}>
        <Text style={styles.text}>dhg</Text>
        <Text style={styles.text}>ggdgdhf</Text>
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
    justifyContent: 'center',
    backgroundColor: 'skyblue',
    width: '100%',
    padding: 10,
    borderRadius: 5,
  },
  box: {
    width: '100%',
    overflow: 'hidden', 
    backgroundColor: 'white',
  },
  text: {
    fontSize: 16,
    color: 'darkblue',
    padding: 10,
  },
  box1: {
    height: '50%',
    width: '100%',
    backgroundColor: 'lightgreen',
  },
});

export default Animation1;
