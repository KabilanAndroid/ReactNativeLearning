import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ScreenType } from '../utils/Types';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
  

} from 'react-native-reanimated';
import { runOnJS } from 'react-native-worklets';

const SlideEx = () => {
  const navigation = useNavigation<NavigationProp<ScreenType>>();
  const translateX = useSharedValue(0);
  const fade = useSharedValue(1);
  const origin = 120;

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {

  fade.value = withTiming(1, { duration: 250 });
    translateX.value = withTiming(0, { duration: 250 });
  }, []);


const fadeOutAndClose = () => {
  'worklet';

  fade.value = withTiming(0, { duration: 220 }, (finished) => {
    if (finished) {
      runOnJS(goBack)();
    }
  });

  translateX.value = withTiming(500, { duration: 200 });
};


  const pan = Gesture.Pan()
    .onUpdate(event => {
      if (event.translationX > 0) {
        translateX.value = event.translationX;
      }
    })
    .onEnd(() => {
      if (translateX.value > origin) {
        fadeOutAndClose();
      } else {
        translateX.value = withSpring(0);
      }
    });

  const bgStyle = useAnimatedStyle(() => {
    const gestureOpacity = interpolate(
      translateX.value,
      [0, origin],
      [1, 0],
    );
    const combined = gestureOpacity * fade.value;
    return {
      opacity: combined,
      backgroundColor: '#00000030',
    };
  });

  const drawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: fade.value,
  }));
//   fadeOutAndClose()

  return (
    <GestureHandlerRootView style={styles.container}>
      <Animated.View
        style={[styles.overlay, bgStyle]}
        onTouchEnd={() => {
          fadeOutAndClose();
        }}
      />

      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.drawer, drawerStyle]} />
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default SlideEx;

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row',backgroundColor:'#00000000' },
  overlay: { flex: 1 },
  drawer: {
    width: '70%',
    backgroundColor: 'yellow',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    zIndex: 10,
  },
});
